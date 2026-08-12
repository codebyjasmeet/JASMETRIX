from models.deepfake_model import predict_image
from models.ai_model import load_ai_model
import os
import shutil
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile

app = FastAPI()

load_ai_model()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to JASMETRIX Backend 🚀"
    }
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    print("main.py reached analyze endpoint")

    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

        prediction = predict_image(file_path)

    print("prediction",prediction)
    return prediction

@app.post("/analyze-video")
async def analyze_video(file: UploadFile = File(...)):

    print("main.py reached video analyze endpoint")

    os.makedirs("uploads/videos", exist_ok=True)

    file_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    print("Video received:", file.filename)

    return {
        "status": "VIDEO_RECEIVED",
        "message": "Video uploaded successfully. AI video analysis will be added next."
    }