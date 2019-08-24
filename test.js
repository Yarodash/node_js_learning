//Init graphic
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var W,H;

function OnResize(e){
    canvas.width = W = window.innerWidth*window.devicePixelRatio;
	  canvas.height = H = window.innerHeight*window.devicePixelRatio;
}
window.addEventListener('resize',OnResize);
OnResize();

//init websocket
function getWebSocketLink() {
    var str = 'ws://' + window.location.hostname + ':8080';
    return str;
};

var socket = new WebSocket(getWebSocketLink());

socket.onopen = function () {
    console.log("Connected.");
};

socket.onclose = function (event) {
    if (event.wasClean)
        console.log('All Okey');
    else
        console.log('hyeta');
    console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};

socket.onmessage = function (event) {
    var data = JSON.parse(event.data);
	console.log(data);

    if (data == 'getping')
        console.log('Ping:', (new Date).getTime()-lastTime, 'ms');
};

function sendMessage(data) {
    socket.send(JSON.stringify(data));
}
