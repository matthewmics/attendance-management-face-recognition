import face_recognition
import cv2
import numpy as np
import time
import requests
import urllib.request
import json
import _thread

import helpers

# SET API URL
api_url = "http://127.0.0.1:5000"

# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

known_face_encodings = []
known_face_names = []

processing_update = False
capture_cd = False

# Load faces from API
response_data = requests.get(api_url + '/api/app-users/getAll').json()

for user in response_data:
    try:
        known_face_encodings.append(
            helpers.face_encoding_from_url(api_url + user["picture_path"]))
        known_face_names.append(str(user["id"]) + "|" + user["name"])
    except:
        print(user["name"] + " has an invalid photo. Encoding was unsuccessful.")

# New thread for checking face updates
def check_face_updates():
    while True:
        global known_face_encodings
        global known_face_names
        global processing_update
        response_data = requests.get(api_url + '/api/app-users/rpi-new').json()
        if response_data["user"]:
            try:
                processing_update = True
                time.sleep(1)
                known_face_encodings.append(helpers.face_encoding_from_url(
                    api_url + response_data["user"]["picture_path"]))
                known_face_names.append(
                    str(response_data["user"]["id"]) + "|" + response_data["user"]["name"])
            except:
                print(response_data["user"]["name"] +
                      " has an invalid photo. Encoding was unsuccessful.")
            finally:
                processing_update = False
        time.sleep(4)
_thread.start_new_thread(check_face_updates, ())

# Thread for resetting cooldown of capture
def reset_capture_cd():
    while True:
        global capture_cd
        if capture_cd:
            time.sleep(4)
            capture_cd = False
        time.sleep(1)
_thread.start_new_thread(reset_capture_cd, ())

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True
has_captured = False

while True:

    # Grab a single frame of video
    ret, frame = video_capture.read()

    # Resize frame of video to 1/4 size for faster face recognition processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

    if has_captured:
        time.sleep(1)
        face_encodings = []
        face_names = []
        has_captured = False
        continue

    fw = int(video_capture.get(cv2.CAP_PROP_FRAME_WIDTH))
    fh = int(video_capture.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_small_frame = small_frame[:, :, ::-1]

    # Only process every other frame of video to save time
    if process_this_frame & (not processing_update) & (not capture_cd):
        if len(known_face_encodings) > 0:
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(
                rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(
                    known_face_encodings, face_encoding)
                name = "Unknown"

                face_distances = face_recognition.face_distance(
                    known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)

                # Print the tolerance of recognition
                # print("Best distance: " + str(face_distances[best_match_index]))

                if matches[best_match_index] and face_distances[best_match_index] < 0.5:
                    name = known_face_names[best_match_index]

                face_names.append(name)

    process_this_frame = not process_this_frame
    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        name_data = name.split("|")

        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        cv2.rectangle(frame, (left, bottom - 35),
                      (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6),
                    font, 1.0, (255, 255, 255), 1)
        cv2.imshow('Video', frame)

        if name != "Unknown" and not(has_captured):
            print(name_data[1])
            has_captured = True
            textFrameWidth = 87
            cv2.rectangle(frame, (int(fw/2) - textFrameWidth, 0),
                          (int(fw/2) + textFrameWidth, 50), (5, 255, 5), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, "CAPTURED", (int(fw/2) - textFrameWidth + 6, 35),
                        font, 1.0, (0, 0, 0), 2)
            response = requests.post(api_url + '/api/attendance-log', data={
                                     'app_user_id': name_data[0], 'temperature': '0.0c'})
            capture_cd = True
            break

    # Display the resulting image

    cv2.imshow('Video', frame)

    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
