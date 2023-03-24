// init express server
const express = require('express');
const app = express();
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
const api = require("./src/api.js")
const cors = require('cors')
liveReloadServer.server.once("connection", () => {
  setTimeout(() => { liveReloadServer.refresh("/") }, 100);
});

// app.use(api, '/api')
app.use(cors())
app.use('/api', api)

app.use(connectLiveReload());
app.use(express.static('public'));
app.listen(3000, () => { console.log('Server is running on port http://localhost:3000') });