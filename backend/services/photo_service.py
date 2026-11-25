import base64
import io

from fastapi import HTTPException
from PIL import Image, ImageOps


def check_photo(photo):
    if photo.size is None:
        raise HTTPException(400, "Could not read the photo size. Please try another photo.")
    
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

    return image


def prepare_photo(image):
    image = ImageOps.exif_transpose(image)
    image = image.convert("RGB")
    image.thumbnail((1568, 1568))
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG", quality=90)
    image_data = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return image_data
