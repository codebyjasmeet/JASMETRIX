from PIL import Image
from models.ai_model import load_ai_model


def predict_image(image_path):

    print(f"Analyzing: {image_path}")

    image = Image.open(image_path).convert("RGB")

    model = load_ai_model()

    results = model(image)

    print("Raw AI Result:", results)

    real_score = 0
    fake_score = 0

    for result in results:
        label = result["label"].lower()
        score = result["score"]

        if label == "real":
            real_score = score

        elif label == "fake":
            fake_score = score

    if fake_score >= real_score:
        status = "FAKE"
        confidence = fake_score
    else:
        status = "REAL"
        confidence = real_score

    result = {
        "status": status,
        "confidence": round(confidence * 100, 2),
        "real_score": round(real_score * 100, 2),
        "fake_score": round(fake_score * 100, 2)
    }

    return result