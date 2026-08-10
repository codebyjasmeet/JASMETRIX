from transformers import pipeline
from PIL import Image

print("Loading model...")

detector = pipeline(
    "image-classification",
    model="prithivMLmods/deepfake-detector-model-v1"
)

print("Model loaded!")

image = Image.open("uploads/real_test.jpg").convert("RGB")

print("Analyzing image...")

results = detector(image)

print("Prediction:")
print(results)