from fastapi import FastAPI

from controllers.analysis_controller import router

app = FastAPI(title="SkinSense API")
app.include_router(router)
