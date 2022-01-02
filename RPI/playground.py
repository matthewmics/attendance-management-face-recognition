import face_recognition
import cv2
import numpy as np
import time
import requests
import _thread
import json

# obama_image = face_recognition.load_image_file("obama.jpg")
# obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

# # print(type(obama_face_encoding))

# response = requests.post('http://127.0.0.1:5000/api/attendance-log', data = {'app_user_id':'3', 'temperature':'0.0c'})
# print(response)


# data1 = 0


# def data1_counter():
#     while True:
#         global data1
#         data1 = data1 + 1
#         time.sleep(2)


# def data1_printer():
#     while True:
#         global data1
#         print(data1)
#         time.sleep(1)



# _thread.start_new_thread(data1_counter, ())
# data1_printer()
# _thread.start_new_thread(data1_printer, ())

# data1_counter()

# while 1:
#     pass

response_data = requests.get('http://127.0.0.1:5000/api/app-users/rpi-new').json()

if response_data["user"]:
    print(response_data["user"]["picture_path"])
else:
    print("no user")