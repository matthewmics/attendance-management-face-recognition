import face_recognition
import pickle
import numpy as np

# Load face encodings
with open('dataset_faces.dat', 'rb') as f:
	all_face_encodings = pickle.load(f)

# Grab the list of names and the list of encodings
face_names = list(all_face_encodings.keys())
face_encodings = np.array(list(all_face_encodings.values()))

# Try comparing an unknown image
unknown_image = face_recognition.load_image_file("obama_small.jpg")
unknown_face = face_recognition.face_encodings(unknown_image)
result = face_recognition.compare_faces(face_encodings, unknown_face)

# Print the result as a list of names with True/False
names_with_result = list(zip(face_names, result))
print(names_with_result)