## Prerequisites

Composer
https://getcomposer.org/

NodeJS
https://nodejs.org/en/download/

Postgresql12 | Download Windows x86-64 - Version: 12
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Python | Download and install version 3.6 or higher
https://www.python.org/downloads/

Download and install Pip for python | below is the link on how to download and install it
https://phoenixnap.com/kb/install-pip-windows

## Running the API and Front end

Open cmd and "cd" (change directory) to API folder of the project directory
```
cd path_to_project/API
```
Execute the following commands
```
composer install


php artisan storage:link (this command should only be executed once)

php artisan migrate (this should be executed everytime there is a change in schema/database)

npm install

npm run dev

# Run server
php artisan serve --port=5000
- OR -
php artisan serve --port=5000 --host 0.0.0.0 (use this command if you want the server accessed across the network)


```

on your browser address bar, navigate to http://127.0.0.1:5000/api/reseed  
to reset and re-populate the database  

Check http://127.0.0.1:5000/ to see if it works

Admin login  
Username: admin@localhost.com  
Password: admin  

## Running Face recognition in python
Install pipenv | run in cmd
```
pip install pipenv
```  
  
  
Open cmd and "cd" (change directory) to RPI folder of the project directory
```
cd path_to_project/RPI
```

Execute the following commands, run the terminal as admin.
#Install Visuall C++ tools and Cmake if using Windows
```
pip install -r requirements.txt

pipenv shell
pipenv install
#If dlib failed to install in the above script, try this:
a. pip install cmake
b. pip install dlib

python .\face_recog_py.py
```



