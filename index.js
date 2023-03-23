// init express server
const express = require('express');
const app = express();

// init socket.io
// const server = require('http').Server(app);
// const io = require('socket.io')(server);


// app.
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});