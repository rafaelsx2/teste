//constante botões
const canvas = document.getElementById("skeleton_draw");
const ctx = canvas.getContext("2d");
const Pencil = document.getElementById("pencil");
const colors = document.getElementById("colorselector");
const brushes = document.getElementById("brushes")
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const Zoomin = document.getElementById("zoomin");
const Zoomout = document.getElementById("zoomout");
const Sharbnt = document.getElementById("share");


//aumenta resolução
canvas.width = 180;
canvas.height = 300;
ctx.scale(1, 1);

//Traçado
let drawing = false;
let currentColor = colors.value;
let currentSize = parseInt(brushes.value);
let isErasing = false;
let scale = 1;

function getPointerPos(evt) {
  const rect = canvas.getBoundingClientRect();
  if (evt.touches) {
    return {
      x: evt.touches[0].clientX - rect.left,
      y: evt.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: evt.offsetX,
      y: evt.offsetY
    };
  }
}

function startDraw(evt) {
  drawing = true;

  ctx.strokeStyle = isErasing ? "#b3e0f2" : currentColor;
  ctx.globalCompositeOperation = isErasing ? "destination-out" : "source-over";
  ctx.lineWidth = currentSize;
  ctx.lineCap = 'round';

  const pos = getPointerPos(evt);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  evt.preventDefault();
}

function draw(evt) {
  if (!drawing) return;
  const pos = getPointerPos(evt);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  evt.preventDefault();
}
// borracha
function endDraw() {
  drawing = false;
  ctx.strokeStyle = isErasing ? '#b3e0f2' : currentColor;
ctx.globalCompositeOperation = isErasing ? "destination-out" : "source-over";
ctx.lineWidth = currentSize;
ctx.lineCap = 'round';
}

eraser.addEventListener("click", () => {
  isErasing = true;
});

colors.addEventListener("input", () => {
  currentColor = colors.value
  isErasing = false;
});

brushes.addEventListener("change", () => {
  currentSize = parseInt(brushes.value);
});

//botões mouse e touch
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseout", endDraw);

canvas.addEventListener("touchstart", startDraw, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", endDraw);


// !!botões!!

Pencil.addEventListener("click", () => {
  isErasing = false;
});

//cores
colors.addEventListener("input", () => {
  currentColor = colors.value;
  isErasing = false;
});

//grossura
brushes.addEventListener("change", () => {
  currentSize = parseInt(brushes.value);
});

//borracha
eraser.addEventListener("click", () => {
  isErasing = true;
});

//limpeza
clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//info popup
document.getElementById("openpopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "flex";
});

document.getElementById("closepopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});




