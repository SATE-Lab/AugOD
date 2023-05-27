# AugOD
## Introduction
AugOD: a test augmentation tool of object detection based on object-level metamorphic relation. 

## Demo
Video demonstration can be found at https://youtu.be/Rz4qp7vih_8.

## Deployment
### Here's how to deploy AugOD locally.
1. Start the frontend:
````sh
cd webapp
npm run dev
````
Then the frontend starts on port 9528, and the frontend code is fixed to make an http request to the backend on port 8000;

2. Start the backend:
````sh
cd server
python manage.py
````
Then backend starts listening on port 8000 by default.


## Technology stack
- python
- flask
- vue-element-admin
- element-ui
- mysql


## Architecture
- Separate frontend and backend. The front end calls the back end interface through http requests.
