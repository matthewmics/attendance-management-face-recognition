import face_recognition
import cv2
import numpy as np
import time
import requests

# obama_image = face_recognition.load_image_file("obama.jpg")
# obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

# print(type(obama_face_encoding))

response = requests.post('http://127.0.0.1:5000/api/attendance-log', data = {'app_user_id':'3', 'temperature':'0.0c'})
print(response)