const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const particles = Array.from({ length: 140 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  dx: (Math.random() - 0.5) * 0.6,
  dy: (Math.random() - 0.5) * 0.6
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,0,0,0.7)";
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
