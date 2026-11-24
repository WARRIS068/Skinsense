import json

import anthropic
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

client = anthropic.Anthropic()

MODEL = "claude-haiku-5-5"
PROMPT_VERSION = 1

SEVERITY_LEVELS = ["none", "mild", "moderate", "severe"]

SYSTEM_PROMPT = """You look at one photo of a person's face and describe visible skin concerns.
This is for general information only. It is not a medical diagnosis.

Rate each of these four concerns: acne, hyperpigmentation, dark circles and skin texture.
For each one, choose exactly one severity: none, mild, moderate or severe.

Give a skin health score from 0 to 100, where 100 means no visible concerns.

Write a short summary of 2 to 3 sentences for the user. Use the words "signs consistent with".
Never name a disease, never diagnose, and never recommend products or medicines.

If the photo does not show exactly one clear human face, set face_found to false."""

RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "face_found": {"type": "boolean"},
        "acne": {"type": "string", "enum": SEVERITY_LEVELS},
        "hyperpigmentation": {"type": "string", "enum": SEVERITY_LEVELS},
        "dark_circles": {"type": "string", "enum": SEVERITY_LEVELS},
        "texture": {"type": "string", "enum": SEVERITY_LEVELS},
        "skin_health_score": {"type": "integer"},
        "summary": {"type": "string"},
    },
    "required": ["face_found", "acne", "hyperpigmentation", "dark_circles",
                 "texture", "skin_health_score", "summary"],
    "additionalProperties": False,
}


def ask_ai(image_data):
    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=4000,
            system=SYSTEM_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/jpeg",
                                "data": image_data,
                            },
                        },
                        {"type": "text", "text": "Describe the visible skin concerns in this photo."},
                    ],
                }
            ],
            output_config={"format": {"type": "json_schema", "schema": RESULT_SCHEMA}},
        )
    except anthropic.AuthenticationError:
        raise HTTPException(500, "The AI key is wrong or missing. Check the .env file.")
    except anthropic.APIConnectionError:
        raise HTTPException(503, "Could not connect to the AI service. Check the internet.")
    except anthropic.APIStatusError:
        raise HTTPException(502, "The AI service had a problem. Try again in a minute.")

    if response.stop_reason != "end_turn":
        raise HTTPException(502, "The AI could not analyse this photo. Try a different photo.")

    reply_text = ""
    for block in response.content:
        if block.type == "text":
            reply_text = block.text
    result = json.loads(reply_text)

    if not result["face_found"]:
        raise HTTPException(400, "No clear face found. Use a photo of one face looking at the camera.")

    if result["skin_health_score"] < 0 or result["skin_health_score"] > 100:
        raise HTTPException(502, "The AI gave an invalid score. Please try again.")

    return result
