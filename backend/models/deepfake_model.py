from PIL import Image
from models.ai_model import load_ai_model


def predict_image(image_path):

    print(f"Analyzing: {image_path}")

    image = Image.open(image_path).convert("RGB")

    model = load_ai_model()

    results = model(image)

    print("Raw AI Result:", results)

    best_result = max(results, key=lambda x: x["score"])

    status = best_result["label"].upper()
    confidence = round(best_result["score"] * 100, 2)

    result = {
        "status": status,
        "confidence": confidence
    }

    return result