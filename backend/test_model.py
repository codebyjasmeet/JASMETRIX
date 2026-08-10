from transformers import pipeline

print("Loading model...")

detector = pipeline(
    "image-classification",
    model="prithivMLmods/deepfake-detector-model-v1"
)

print("Model loaded successfully!")