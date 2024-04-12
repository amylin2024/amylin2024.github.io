var info = [
  "一等奖",
  "二等奖",
  "三等奖",
  "四等奖",
  "四等奖",
  "五等奖",
  "六等奖",
];
var color = [];
var step = 0;
var outerRout = 156; //轮盘寬的大小
var outerR = 150; //轮盘的大小
// var interRout = 54; //内存邊框圆的大小
var interR = 50; //内存空白圆的大小
var beginAngle = 50; //旋转起来时默认开始旋转的度数，度数愈大旋转的初始速度愈大
var radio = 0.95; //旋转速度衰减系数，影响旋转时间
var t = null;
function onloadFun() {
  step = (2 * Math.PI) / info.length;
  for (var i = 0; i < info.length; i++) {
    if (i % 2 == 0) {
      color.push("#e84a4b");
    } else {
      color.push("#fff");
    }
    // color.push(getColor());
  }
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.translate(250, 250);
  createArrow(context);
  init(context);
  document.getElementById("btn").onclick = function () {
    if (t) {
      return false;
    }
    var step = beginAngle + Math.random() * info.length;
    var angle = 0;
    t = setInterval(function () {
      step *= radio;
      if (step <= 0.1) {
        clearInterval(t);
        t = null;
        var pos = Math.ceil(angle / (360 / info.length));
        var res = info[info.length - pos];
        context.save();
        context.beginPath();
        context.font = "25px 微软雅黑";
        context.fillStyle = "#fff";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(res, 0, 0);
        context.restore();
      } else {
        context.clearRect(-250, -250, 500, 500);
        angle += step;
        if (angle > 360) {
          angle -= 360;
        }
        context.save();
        context.beginPath();
        context.rotate((angle * Math.PI) / 180);
        init(context);
        context.restore();
        createArrow(context);
      }
    }, 60);
  };
}

function createArrow(context) {
  context.save();
  context.beginPath();
  context.lineWidth = 5;
  context.fillStyle = "#2f5383";
  context.moveTo(170, 0);
  context.lineTo(180, 15);
  context.lineTo(180, 5);
  context.lineTo(220, 5);
  context.lineTo(220, -5);
  context.lineTo(180, -5);
  context.lineTo(180, -15);
  context.closePath();
  context.fill();
  context.restore();
}
function init(context) {
  context.save();
  context.beginPath();
  context.fillStyle = "#2f5383";
  context.arc(0, 0, outerRout, 0, 2 * Math.PI);
  context.fill();
  context.restore();

  for (var i = 0; i < info.length; i++) {
    context.save();
    context.beginPath();
    context.moveTo(0, 0);
    context.fillStyle = color[i];
    context.arc(0, 0, outerR, i * step, (i + 1) * step);
    context.fill();
    context.restore();
  }

  // context.save();
  // context.beginPath();
  // context.fillStyle = "#2f5383";
  // context.arc(0, 0, interRout, 0, 2 * Math.PI);
  // context.fill();
  // context.restore();

  context.save();
  context.beginPath();
  context.fillStyle = "#2f5383";
  context.arc(0, 0, interR, 0, 2 * Math.PI);
  context.fill();
  context.restore();

  for (var i = 0; i < info.length; i++) {
    context.save();
    context.beginPath();
    context.fillStyle = "#fff";

    if (i % 2 == 0) {
      context.fillStyle = "#fff";
    } else {
      context.fillStyle = "#e84a4b";
    }
    context.font = "15px 微软雅黑";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.rotate(i * step + step / 2);
    context.fillText(info[i], (outerR + interR) / 2, 0);
    context.restore();
  }
}
// function getColor() {
//   var random = function () {
//     return Math.min(Math.floor(Math.random() * 255) + 100, 255);
//   };
//   // return "rgb("+random()+","+random()+","+random()+")";
//   return "rgb(" + random() + "," + random() + "," + random() + ")";
// }

// ==================操作==================
const add = document.querySelector(".add");
const create = document.querySelector(".create");
const tagBox = document.querySelector(".tagBox");
const inputEl = document.querySelector(".inputEl");
const delEls = document.getElementsByClassName(".del");
const addBtn=document.querySelectorAll('.select_item');
add.addEventListener("click", function () {
  if (!inputEl.value) {
    alert("請輸入");
    return;
  }
  let html =
    tagBox.innerHTML +
    "<li>" +
    "<span class='tag'>" +
    inputEl.value +
    "</span>" +
    "<span class='del'>移除</span></li>";
  tagBox.innerHTML = html;
  info.push(inputEl.value);
  inputEl.value = "";
});

addBtn.forEach((item)=>{
  item.addEventListener("click",function(){
    let itemName=this.querySelector('span').textContent
    let html =
    tagBox.innerHTML +
    "<li>" +
    "<span class='tag'>" +
    itemName +
    "</span>" +
    "<span class='del'>移除</span></li>";
    info.push(itemName);
    tagBox.innerHTML=html

  })
})
create.addEventListener("click", function () {
  const tags = document.querySelectorAll(".tagBox .tag");
  document.querySelector("#canvas").remove();
  document.querySelector("#canvasBox").innerHTML =
    ' <canvas id="canvas" width="500px" height="500px"></canvas>';

  info = [];
  tags.forEach((item) => {
    info.push(item.textContent);
  });
  if (info.length % 2) {
    info.push("再一次!");
  }
  console.log(info);
  onloadFun();
});

tagBox.addEventListener("click", function (e) {
  console.log(e.target.parentNode);
  e.target.parentNode.remove();
});

// onloadFun();
