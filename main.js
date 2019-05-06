var btn_Eraser = document.getElementById("eraser");
var userState = 'drow';

//设置画板大小
var canvas = document.getElementById("canvas2");
console.log(document.getElementById("canvas2"));
autoSetCanvasSize(canvas);
var context = canvas.getContext('2d');

//橡皮擦点击事件
btn_Eraser.onclick = function(btn) {
    if (userState == 'eraser') {
        setuserstate('drow');
        btn_Eraser.textContent = '橡皮擦';
    } else {
        setuserstate('eraser');
        btn_Eraser.textContent = '画笔';
    }

}


var mousedown = false;
var lastPos = {
    x: undefined,
    y: undefined
};
canvas.onmousedown = function(a) {
    var x = a.clientX;
    var y = a.clientY;
    mousedown = true;
    switch (userState) {
        case 'drow':
            lastPos.x = x;
            lastPos.y = y;
            drawCircle(x, y, 1);
            break;
        case 'eraser':
            context.clearRect(x - 5, y - 5, 10, 10);
            break;
    }
}
canvas.onmousemove = function(b) {
    if (!mousedown) {
        return;
    }
    var x = b.clientX;
    var y = b.clientY;

    switch (userState) {
        case 'drow':
            var dviA = document.createElement('dvi');
            drawLine(lastPos.x, lastPos.y, x, y);
            break;
        case 'eraser':
            context.clearRect(x - 5, y - 5, 10, 10);
            break;
    }

    lastPos.x = x;
    lastPos.y = y;

}
canvas.onmouseup = function(c) {
    mousedown = false;
}

//画出线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'red';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
//画出原形
function drawCircle(x, y, ridius) {
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(x, y, ridius, 0, Math.PI * 2);
    context.fill();
}
//设置画板大小
function autoSetCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;

    window.onresize = function(size) {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}
//设置笔的状态
function setuserstate(state) {
    userState = state;
}