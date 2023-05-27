# AugOD
## Introduction
AugOD: a test augmentation tool of object detection based on object-level metamorphic relation. 

## Demo
Video demonstration can be found at https://youtu.be/Rz4qp7vih_8.

## Deployment
### Here's how to deploy AugOD locally.
1. The frontend starts the 'npm run dev' model on port 9528, and the frontend code is fixed to make an http request to the backend on port 8000;
2. Backend starts' python manage.py 'listening on port 8000 by default.


## Technology stack
- python
- flask
- vue-element-admin
- element-ui
- mysql


## Architecture
- Separate front end and back end. The front end calls the back end interface through http requests.
