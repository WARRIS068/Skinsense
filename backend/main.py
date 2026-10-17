from fastapi import FastAPI

app = FastAPI(title="SkinSense API")


@app.get("/health")
def health():
    return {"status": "ok"}