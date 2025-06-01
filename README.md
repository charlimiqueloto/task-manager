# Task Manager API

Back-end Node.js + Express with MongoDB (via Docker), using Mongoose.

## Run locally

- Docker with Mongo:
    - `docker run -d --name taskmanager-mongo -p 27018:27017 -e MONGO_INITDB_DATABASE=taskmanager mongo`
- `.env` with:
    - `MONGO_URI=mongodb://localhost:27018/taskmanager`
- To run the API:
    - `npm install`
    - `npm run dev`
