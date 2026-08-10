from models.ai_model import load_ai_model
from PIL import Image
import os


model = load_ai_model()


def test_folder(folder, actual_label):
    print("\n==============================")
    print("Testing:", actual_label)
    print("==============================")

    correct = 0
    total = 0

    for filename in os.listdir(folder):

        file_path = os.path.join(folder, filename)

        try:
            image = Image.open(file_path).convert("RGB")

            results = model(image)

            real_score = 0
            fake_score = 0

            for result in results:
                label = result["label"].lower()
                score = result["score"]

                if "real" in label:
                    real_score = score

                elif "fake" in label:
                    fake_score = score

            prediction = "REAL" if real_score > fake_score else "FAKE"

            total += 1

            if prediction == actual_label:
                correct += 1

            print(f"\nImage: {filename}")
            print(f"Real: {real_score * 100:.2f}%")
            print(f"Fake: {fake_score * 100:.2f}%")
            print(f"Prediction: {prediction}")
            print(f"Expected: {actual_label}")

        except Exception as error:
            print(f"\nCould not process {filename}")
            print("Error:", error)

    if total > 0:
        accuracy = (correct / total) * 100
        print(
            f"\n{actual_label} Accuracy: "
            f"{correct}/{total} = {accuracy:.2f}%"
        )


test_folder("test_images/real", "REAL")
test_folder("test_images/fake", "FAKE")