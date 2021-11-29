import face_recognition
import pickle

all_face_encodings = {}

img1 = face_recognition.load_image_file("obama.jpg")
all_face_encodings["obama"] = face_recognition.face_encodings(img1)[0]

img2 = face_recognition.load_image_file("biden.jpg")
all_face_encodings["biden"] = face_recognition.face_encodings(img2)[0]

with open('dataset_faces.dat', 'wb') as f:
    pickle.dump(all_face_encodings, f)