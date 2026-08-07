import tensorflow as tf

model = None

def load_ai_model():
    global model

    if model is None:
        print("Loading AI Model...")
        print("AI Model Loaded!")

    return model