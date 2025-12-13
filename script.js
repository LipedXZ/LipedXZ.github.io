// Cursor
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

// Modal buy system
let selectedService = '';
let selectedPrice = '';

function openModal(service, price) {
  selectedService = service;
  selectedPrice = price;
  document.getElementById('modal-service').innerText = service;
  document.getElementById('user-contact').value = '';
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Buy button in modal
document.getElementById('modal-buy-btn').addEventListener('click', () => {
  const contact = document.getElementById('user-contact').value.trim();
  if (!contact) return alert("Please enter your contact info!");

  // Send Discord webhook
  fetch("https://discord.com/api/webhooks/1449459284709740545/xWFvYHVzlY9_Sq6VV5xqoRCL1nJw2cMneuEHbL33AW5-zdErKChgWl-Ct5KRHBJ_0v5_", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `🛒 Order: ${selectedService}\nPrice: €${selectedPrice}\nContact: ${contact}\nSend money to: alaakorj2007@gmail.com`
    })
  });

  // Redirect to PayPal
  const amount = selectedPrice;
  const email = "alaakorj2007@gmail.com";
  const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${email}&currency_code=EUR&amount=${amount}&item_name=${selectedService}`;
  window.open(paypalURL, "_blank");

  closeModal();
});

// Close modal if clicked outside
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) modal.style.display = "none";
}
