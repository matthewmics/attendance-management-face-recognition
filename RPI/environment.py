# SET API URL
url = "http://127.0.0.1:5000"

# threshold before face computation executes
# minimum value = 10
# setting this too high would take time before it captures, setting it too low would cause lag
# fine tune this value until you get your desired result
frame_threshold = 100

#  0.45 = very strict, no look alikes would get captured, set it to this when you have an HD web cam
#  0.56 = still safe but look alikes could get captured
similar_face_threshold = 0.51

# index of your web cam
# 0 = laptop's built in camera | if not a laptop, still use 0 to reference the first web cam
# 1 = external camera or the second camera
camera_index = 0