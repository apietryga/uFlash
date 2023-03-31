const express = require('express');
const app = express();
const api = require("./src/api.js")
const cors = require('cors')
const bp = require('body-parser')

app.use(cors())
app.use(bp.json())
app.use('/api', api)

app.use("/", express.static(__dirname + "/public"));
app.use("/storage", express.static(__dirname + "/storage"));
app.use("/templates", express.static(__dirname + "/src/models/Templates"));

app.listen(3000, () => { console.log('Server is running on port http://localhost:3000') });