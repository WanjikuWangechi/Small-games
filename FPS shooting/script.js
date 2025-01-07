// JavaScript
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gun = document.querySelector(".gun");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bullets = [];

function shoot(x, y) {
    const bullet = {
        x: canvas.width / 2,
        y: canvas.height - 100,
        targetX: x,
        targetY: y,
        speed: 15,
    };
    bullets.push(bullet);
}

function drawBullets() {
    bullets.forEach((bullet, index) => {
        const dx = bullet.targetX - bullet.x;
        const dy = bullet.targetY - bullet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < bullet.speed) {
            bullets.splice(index, 1);
            return;
        }

        const angle = Math.atan2(dy, dx);
        bullet.x += Math.cos(angle) * bullet.speed;
        bullet.y += Math.sin(angle) * bullet.speed;

        // Draw trail
        ctx.fillStyle = "yellow";
        ctx.fillRect(bullet.x - 2, bullet.y - 20, 4, 20);

        // Draw bullet
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#cc7722";
        ctx.fill();
        ctx.closePath();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBullets();
    requestAnimationFrame(animate);
}

canvas.addEventListener("mousedown", (e) => {
    gun.classList.add("shooting");
    shoot(e.clientX, e.clientY);
});

canvas.addEventListener("mouseup", () => {
    gun.classList.remove("shooting");
});

canvas.addEventListener("touchstart", (e) => {
    gun.classList.add("shooting");
    const touch = e.touches[0];
    shoot(touch.clientX, touch.clientY);
});

canvas.addEventListener("touchend", () => {
    gun.classList.remove("shooting");
});

animate();
