import urllib.request
import face_recognition

def face_encoding_from_url(url):
    response = urllib.request.urlopen(url)
    image = face_recognition.load_image_file(response)
    return face_recognition.face_encodings(image)[0]
