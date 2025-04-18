import numpy as np
from PIL import Image
from tensorflow.keras.preprocessing import image
import io

IMG_SIZE = 224


def preprocess_image(img_file):

    img_bytes = img_file.read()
    img = Image.open(io.BytesIO(img_bytes))
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


# ['Abyssinian', 'American Bobtail', 'American Curl', 'American Shorthair', 'Bengal', 'Birman', 'Bombay', 'British Shorthair', 'Egyptian Mau', 'Exotic Shorthair', 'Maine Coon', 'Manx', 'Norwegian Forest', 'Persian', 'Ragdoll', 'Russian Blue', 'Scottish Fold', 'Siamese', 'Sphynx', 'Turkish Angora']#
