from fastapi import APIRouter, UploadFile

from models.photo_model import check_photo, prepare_photo
from models.ai_model import ask_ai, MODEL, PROMPT_VERSION
from models.advice_model import needs_dermatologist, get_ingredients

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/analyse")
def analyse(photo: UploadFile):
    image = check_photo(photo)
    image_data = prepare_photo(image)

    result = ask_ai(image_data)

    result["needs_dermatologist"] = needs_dermatologist(result)
    result["ingredients"] = get_ingredients(result)

    result["model"] = MODEL
    result["prompt_version"] = PROMPT_VERSION
    return result
