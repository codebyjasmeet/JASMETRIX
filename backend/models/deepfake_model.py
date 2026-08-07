from PIL import Image
import numpy as np

def predict_image(image_path):
    print(f"Analyzing: {image_path}")
    img = Image.open(image_path)
    print(img.size)

    img = img.resize((224, 224))
    print("After Resize:", img.size)

    img_array = np.array(img)
    img_array = img_array / 255.0

    print("Min:", img_array.min())
    print("Max:", img_array.max())
    img_array = np.expand_dims(img_array, axis=0)

    print("Final Shape:", img_array.shape)

    print("Shape:", img_array.shape)

    result = {
        "status": "FAKE",
        "confidence": 97.4
    }   
    return result