const cv = require('opencv4nodejs');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const FPS = 10;
const wCap = new cv.VideoCapture(0);

app.get('/', (req, res) => {
    res.sendFile( path.join( __dirname, 'index.html' ) );
});

setInterval( _ => {
    const frame = wCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', image);
}, 1000/FPS);

server.listen(3000, _ => {
    console.log('Server listening on port 3000');
});