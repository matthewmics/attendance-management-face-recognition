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

php artisan migrate

npm install

npm run dev

php artisan serve --port=5000
```
Check http://127.0.0.1:5000/ to see if it works

Admin login  
Username: admin@admin.com  
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

Execute the following commands
```
pipenv shell
pipenv install

python .\face_recog_py.py
```



