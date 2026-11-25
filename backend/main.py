from fastapi import FastAPI
from controllers.analysis_controller import router
from database import create_tables


app = FastAPI(title="SkinSense API")
app.include_router(router)
create_tables()