from transformers import pipeline

model = None

def load_ai_model():
    global model

    if model is None:
        print("Loading AI Model...")

        model = pipeline(
            "image-classification",
            model="prithivMLmods/deepfake-detector-model-v1"
        )

        print("AI Model Loaded!")

    return model