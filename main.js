document.body.ontouchstart = function(click) {
    click.preventDefault();
}
var userState = 'drow';
var pencolor = 'black'
    //设置画板大小
var canvas = document.getElementById("canvas2");
autoSetCanvasSize(canvas);
var context = canvas.getContext('2d');

//设置画笔颜色按钮
red.onclick = function() {
    pencolor = 'red';
    red.classList.add("select");
    green.classList.remove("select");
    blue.classList.remove("select");
    btn_pen.onclick();
}
green.onclick = function() {
    pencolor = 'green';
    red.classList.remove("select");
    green.classList.add("select");
    blue.classList.remove("select");
    btn_pen.onclick();
}
blue.onclick = function() {
    pencolor = 'blue';
    red.classList.remove("select");
    green.classList.remove("select");
    blue.classList.add("select");
    btn_pen.onclick();
}

//清除按钮
clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//下载按钮
save.onclick = function() {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = "MyImage";
    a.click();
}

//橡皮擦点击事件
var btn_Eraser = document.getElementById("eraser");
btn_Eraser.onclick = function(btn) {
    setuserstate('eraser');
    pen.classList.remove('active');
    eraser.classList.add('active');
    mousedown = false;
    touchdown = false;
}

//笔的点击事件
var btn_pen = document.getElementById("pen");
btn_pen.onclick = function(btn) {
    setuserstate('drow');
    eraser.classList.remove('active');
    pen.classList.add('active');
    mousedown = false;
    touchdown = false;
}


//非触碰设备
canvas.onmousedown = msdown;
canvas.onmousemove = msmove;
canvas.onmouseup = msup;
//如果发现触屏设备
if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = todown;
    canvas.ontouchmove = tomove;
    canvas.ontouchend = toup;
}




//画出线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = pencolor;
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
//画出原形
function drawCircle(x, y, ridius) {
    context.beginPath();
    context.fillStyle = pencolor;
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



//-------------------鼠标控制的方法------------------
var mousedown = false;
var lastPos = {
    x: undefined,
    y: undefined
};
//鼠标按下的方法
function msdown(a) {
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

//鼠标移动的方法
function msmove(b) {
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

//鼠标抬起的方法
function msup(c) {
    mousedown = false;
}


//-------------------触碰控制的方法------------------
var touchdown = false;
var lastPos2 = {
    x: undefined,
    y: undefined
};
//触屏按下
function todown(a) {
    var x = a.touches[0].clientX;
    var y = a.touches[0].clientY;
    touchdown = true;
    console.log(x + "   " + y);
    switch (userState) {
        case 'drow':
            lastPos2.x = x;
            lastPos2.y = y;
            drawCircle(x, y, 1);
            break;
        case 'eraser':
            context.clearRect(x - 5, y - 5, 10, 10);
            break;
    }
}
//触屏中
function tomove(b) {
    if (!touchdown) {
        return;
    }
    var x = b.touches[0].clientX;
    var y = b.touches[0].clientY;
    switch (userState) {
        case 'drow':
            var dviA = document.createElement('dvi');
            drawLine(lastPos2.x, lastPos2.y, x, y);
            break;
        case 'eraser':
            context.clearRect(x - 5, y - 5, 10, 10);
            break;
    }
    lastPos2.x = x;
    lastPos2.y = y;
}
//触屏结束
function toup(c) { touchdown = false; }