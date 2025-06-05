@echo off
echo Starting Docker container...
docker start taskmanager-mongo

echo Waiting 5 seconds for Mongo to be ready
timeout /t 5

echo Running seed.js
node seed.js

echo Starting the server with nodemon
npm run dev

echo Starting the client
cd client/task-manager
ng serve --o