import face_recognition
import cv2
import numpy as np
import time

obama_image = face_recognition.load_image_file("obama.jpg")
obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

print(type(obama_face_encoding))