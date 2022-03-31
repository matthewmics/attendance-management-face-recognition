url = "http://127.0.0.1:5000"

# threshold before face computation executes
# minimum value = 10
frame_threshold = 100

#  0.45 = very strict, no look alikes would get captured 
#  0.56 = still safe but look alikes could get captured
similar_face_threshold = 0.51

# index of your camera | 0 = laptop's built in camera | 1 = external camera | 2 = if you have more than 1 external cameras
camera_index = 0