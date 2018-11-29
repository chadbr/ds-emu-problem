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

the emulator seems to be running fine:

```
[datastore] INFO: Time to persist datastore: 2 ms
[datastore] Nov 29, 2018 3:52:46 PM io.gapi.emulators.grpc.GrpcServer$3 operationComplete
[datastore] INFO: Adding handler(s) to newly registered Channel.
[datastore] Nov 29, 2018 3:52:46 PM io.gapi.emulators.netty.HttpVersionRoutingHandler channelRead
[datastore] INFO: Detected HTTP/2 connection.
[datastore] Nov 29, 2018 3:53:06 PM com.google.cloud.datastore.emulator.impl.LocalDatastoreFileStub lambda$persist$7
[datastore] INFO: Time to persist datastore: 1 ms
[datastore] Nov 29, 2018 3:55:06 PM com.google.cloud.datastore.emulator.impl.LocalDatastoreFileStub lambda$persist$7
[datastore] INFO: Time to persist datastore: 2 ms
```
