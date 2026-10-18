from fastapi import FastAPI, UploadFile, HTTPException
from PIL import Image

app = FastAPI(title="SkinSense API")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyse")
def analyse(photo: UploadFile):
    
    if photo.size > 10 * 1024 * 1024:
        raise HTTPException(400, "Photo is too big. Use a photo under 10 MB.")

    try:
        image = Image.open(photo.file)
    except Exception:
        raise HTTPException(400, "This file is not a photo.")

    if image.format not in ["JPEG", "PNG", "WEBP"]:
        raise HTTPException(400, "Please upload a JPEG, PNG or WebP photo.")

    width, height = image.size
    if width < 512 or height < 512:
        raise HTTPException(400, "Photo is too small. Use a bigger photo.")

    return {"status": "accepted", "width": width, "height": height}