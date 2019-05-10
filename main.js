//用户鼠标的状态
var userState = 'drow';
//用户笔的颜色
var pencolor = 'black';

//清理点击事件
document.body.ontouchstart = function(click) {
    click.preventDefault();
}

document.getElementById("addColor").onclick = function(click) {
    document.getElementById("colorPanl_Bg").classList.add(".actions");
}

//颜色集合
var myColors = [
    { r: 0, g: 0, b: 0 },
    { r: 255, g: 0, b: 0 },
    { r: 0, g: 255, b: 0 },
    { r: 0, g: 0, b: 255 }
]


//笔的点击事件
var btn_pen = document.getElementById("pen");
btn_pen.onclick = function(btn) {
    setuserstate('drow');
    eraser.classList.remove('active');
    pen.classList.add('active');
    mousedown = false;
    touchdown = false;
}

//添加颜色，并且添加点击事件
var selectcolorindex = 0;
loadData();
InitColor();


//RGB转16进制
function colorRGB2Hex(color) {
    var r = parseInt(color.r);
    var g = parseInt(color.g);
    var b = parseInt(color.b);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

//设置画板大小
var canvas = document.getElementById("canvas2");
autoSetCanvasSize(canvas);
var context = canvas.getContext('2d');

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
        case "none":
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
        case "none":
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
    //console.log(x + "   " + y);
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
    //b.preventDefault();
}
//触屏结束
function toup(c) { touchdown = false; }

function loadData(){
    if (localStorage.getItem('colors')) {
        var hashInlocalStorage = JSON.parse(localStorage.getItem('colors'));
        if (hashInlocalStorage) {
            myColors = hashInlocalStorage;
        }
    }
}

function selectpencolor(index){
    pencolor = colorRGB2Hex(myColors[index]);
    console.log(btn_pen)
    btn_pen.onclick();
}

function InitColor() {
    var Element_colors = document.getElementById("colors");

    for (var index = 0; index < myColors.length; index++) {
        var child = document.getElementById("myColor" + index);
        if (child) {
            Element_colors.removeChild(child);
        }
        var li = document.createElement("li");
        Element_colors.appendChild(li);     
        li.style = "background: rgb(" + myColors[index]["r"] + "," + myColors[index]["g"] + "," + myColors[index]["b"] + ");transition: all 0.3s;";
        li.id = "myColor" + index;


        
        
        var dvi_delete = document.createElement("dvi");
        dvi_delete.id=index;
        dvi_delete.className="colorDelete";
        li.appendChild(dvi_delete);
        dvi_delete.onclick=function(btn){
            var child=btn.target.parentNode;
            child.parentNode.removeChild(child);
            //console.log(btn.target.parentNode.parentNode)
            //btn.target.parentNode.parentNode.remove(btn.target.parentNode);
            console.log(myColors.length);
            myColors.splice(btn.target.id,1);
            savemyColorDate()
            console.log(myColors.length);
        }


        if (index === selectcolorindex) {
            li.classList.add("select");
            li.childNodes[0].classList.add("select");
            selectpencolor(selectcolorindex);

        }
    }
    selectcolorindex = myColors.length;
    console.log(selectcolorindex);
    for (var index = 1; index < Element_colors.children.length; index++) {
        Element_colors.children[index].onclick = function(eee) {

            for (var index1 = 1; index1 < Element_colors.children.length; index1++) {
                if (eee.target === Element_colors.children[index1]) {
                    Element_colors.children[index1].classList.add("select");
                    Element_colors.children[index1].childNodes[0].classList.add("select");
                    selectpencolor(index1 - 1);
                } else {
                    Element_colors.children[index1].classList.remove("select");
                    Element_colors.children[index1].childNodes[0].classList.remove("select");
                }
            }
        }
    }
}

var colorPanl_Color_r = document.getElementById("colorPanl_Color_r");
var colorPanl_Color_g = document.getElementById("colorPanl_Color_g");
var colorPanl_Color_b = document.getElementById("colorPanl_Color_b");
colorPanl_Color_r.onchange = changeColor;
colorPanl_Color_g.onchange = changeColor;
colorPanl_Color_b.onchange = changeColor;

function changeColor() {

    var colorPanl = document.getElementById("colorPanl_Color");
    colorPanl.style = "background:rgb(" + colorPanl_Color_r.value + "," + colorPanl_Color_g.value + "," + colorPanl_Color_b.value + ")";
}

//
var btn_addcolor = document.getElementById("addColor");
btn_addcolor.onclick = function(eee) {
    document.getElementById("colorPanl_Bg").classList.add("actions");
}

//
var btn_cancel = document.getElementById("colorPanl_cancel");
btn_cancel.onclick = function(eee) {
    document.getElementById("colorPanl_Bg").classList.remove("actions");
}

//
var btn_ok = document.getElementById("colorPanl_ok");
btn_ok.onclick = function(eee) {
    myColors.push({ r: colorPanl_Color_r.value, g: colorPanl_Color_g.value, b: colorPanl_Color_b.value });
    InitColor();
    document.getElementById("colorPanl_Bg").classList.remove("actions");
    savemyColorDate();
}

function savemyColorDate(){
    localStorage.setItem('colors', JSON.stringify(myColors));
}