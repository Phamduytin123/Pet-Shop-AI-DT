from flask import Flask, request, jsonify
import numpy as np
from utils.preprocess import preprocess_image
import os
from tensorflow.keras.models import load_model
import zipfile

app = Flask(__name__)


# Đường dẫn đến model .keras
MODEL_PATH = r"D:\LN_\totnghiep\Pet-Shop-AI-DT\AI\model\best_model.h5"
print("Zip test:", zipfile.is_zipfile(MODEL_PATH))
print(MODEL_PATH)
model = load_model(MODEL_PATH)


class_labels = [
    "Abyssinian",
    "American Bobtail",
    "American Curl",
    "American Shorthair",
    "Bengal",
    "Birman",
    "Bombay",
    "British Shorthair",
    "Egyptian Mau",
    "Exotic Shorthair",
    "Maine Coon",
    "Manx",
    "Norwegian Forest",
    "Persian",
    "Ragdoll",
    "Russian Blue",
    "Scottish Fold",
    "Siamese",
    "Sphynx",
    "Turkish Angora",
]  # Thay theo dataset của bạn


@app.route("/")
def home():
    return "Cat Image Recognition API is running."


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    img_file = request.files["image"]
    img = preprocess_image(img_file)

    # Dự đoán
    prediction = model.predict(img)
    class_index = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    result = {"class": class_labels[class_index], "confidence": round(confidence, 4)}

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
