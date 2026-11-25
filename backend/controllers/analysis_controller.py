from fastapi import APIRouter, Request, UploadFile

from services.photo_service import check_photo, prepare_photo
from services.ai_service import ask_ai, MODEL, PROMPT_VERSION
from services.advice_service import needs_dermatologist, get_ingredients
from entities.analysis import Analysis
from repositories import analysis_repo
from services.rate_limit_service import check_rate_limit

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/analyse")
def analyse(photo: UploadFile, request: Request):
    check_rate_limit(request.client.host)
    image = check_photo(photo)
    image_data = prepare_photo(image)

    result = ask_ai(image_data)

    result["needs_dermatologist"] = needs_dermatologist(result)
    result["ingredients"] = get_ingredients(result)

    result["model"] = MODEL
    result["prompt_version"] = PROMPT_VERSION
    analysis = analysis_repo.save(Analysis(result))
    result["id"] = analysis.id
    return result


@router.get("/analyses")
def get_analyses():
    return analysis_repo.find_all()
