const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  dx: (Math.random() - 0.5) * 1.2,
  dy: (Math.random() - 0.5) * 1.2,
  size: Math.random() * 2 + 1
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,0,0,0.8)";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Buy system
function buy(service, price, inputId) {
  const username = document.getElementById(inputId).value.trim();
  if(!username) return alert("Please enter your Discord username!");

  // Redirect to PayPal safely
  const paypalLinks = {
    "Discord Bot": "https://www.paypal.com/paypalme/YOURPAYPALME/12.99",
    "Game Script": "https://www.paypal.com/paypalme/YOURPAYPALME/15.00",
    "Random Script": "https://www.paypal.com/paypalme/YOURPAYPALME/11.00",
    "Hire Me (Full-time)": "https://www.paypal.com/paypalme/YOURPAYPALME/70.00",
    "Hire Me (Part-time)": "https://www.paypal.com/paypalme/YOURPAYPALME/40.00"
  };

  window.open(paypalLinks[service], "_blank");

  // Send info to Discord webhook
  fetch("https://discord.com/api/webhooks/1449459284709740545/xWFvYHVzlY9_Sq6VV5xqoRCL1nJw2cMneuEHbL33AW5-zdErKChgWl-Ct5KRHBJ_0v5_", {
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      content: `🛒 **Order Received!**\nService: ${service}\nPrice: €${price}\nDiscord Username: ${username}`
    })
  });
}
