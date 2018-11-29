# Introduction
This repo is to replicate an issue where the datastore emulator gets exponentially slower as data is written to it on macos.

This started ~Nov 27th (roughly the same time as the npm event-stream issue).

The issue has happened on both older gcloud install (218.0.0) (~2 months) and the most recent (226.0.0)

## to run

* clone the repo

* install and build  
`npm install`  
`npm run build`

* start the emulator

`gcloud beta emulators datastore start --host-port=localhost:8555`

* run the app
`npm start`  
`npm run dev` (to run under nodemon)

you should see each update go very slowly (and get slower over time)
