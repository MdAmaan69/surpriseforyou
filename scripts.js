document.getElementById('introButton').addEventListener('click', () => {
    document.getElementById('introButton').classList.add('hidden');
    const birthdayMessage = document.getElementById('birthdayMessage');
    birthdayMessage.classList.remove('hidden');
    gsap.fromTo(birthdayMessage, { opacity: 0 }, { opacity: 1, duration: 2 });
    startConfetti();
});

document.getElementById('flirtButton').addEventListener('click', () => {
    document.getElementById('birthdayMessage').classList.add('hidden');
    const flirtyLines = document.getElementById('flirtyLines');
    flirtyLines.classList.remove('hidden');
    showFlirtyLine();
});

document.getElementById('newLineButton').addEventListener('click', showFlirtyLine);

function showFlirtyLine() {
    const flirtyLines = [
        "Your smile must be the work of a top designer—perfect and captivating.",
        "Every time you laugh, it's like a melody that brightens my day.",
        "Your beauty is like a sunrise; it lights up everything around you.",
        "If I could rearrange the alphabet, I'd put U and I together.",
        "You must have a great eye for fashion because you always look amazing.",
        "The way you carry yourself is so graceful; you could be a model.",
        "Your eyes are like a masterpiece; they draw me in every time.",
        "Is there a mirror in your pocket? Because I can see myself in you.",
        "You have a way of making everything look more beautiful.",
        "If beauty were a crime, you'd be serving a life sentence.",
        "Your presence is like a refreshing breeze on a warm day.",
        "You have the kind of beauty that makes heads turn.",
        "If elegance were a sport, you'd be a gold medalist.",
        "When you walk into a room, it's like a spotlight follows you.",
        "Your style is so impeccable; I can't help but admire it.",
        "Every time I see you, you look even more stunning.",
        "You have a natural charm that's simply irresistible.",
        "The way you smile makes everything around you brighter.",
        "If there was a contest for being gorgeous, you'd win hands down.",
        "Your sense of style is as flawless as your beauty."
    ];

    const randomLine = flirtyLines[Math.floor(Math.random() * flirtyLines.length)];
    const flirtyLineElement = document.getElementById('flirtyLine');
    gsap.fromTo(flirtyLineElement, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
    flirtyLineElement.textContent = randomLine;
}

function startConfetti() {
    const confetti = document.getElementById('confettiCanvas');
    const ctx = confetti.getContext('2d');
    const particles = [];
    const particleCount = 150;

    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;

    function ConfettiParticle() {
        this.x = Math.random() * confetti.width;
        this.y = Math.random() * confetti.height - confetti.height;
        this.r = Math.random() * 4 + 1;
        this.d = Math.random() * particleCount;
        this.color = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.8)`;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = (Math.random() * 0.07) + 0.05;
        this.tiltAngle = 0;

        this.draw = function() {
            ctx.beginPath();
            ctx.lineWidth = this.r;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
            ctx.stroke();
        };
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new ConfettiParticle());
    }

    function draw() {
        ctx.clearRect(0, 0, confetti.width, confetti.height);
        for (let i = 0; i < particleCount; i++) {
            particles[i].draw();
        }
        update();
    }

    function update() {
        for (let i = 0; i < particleCount; i++) {
            let p = particles[i];
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.x += Math.sin(p.d);
            p.tilt = Math.sin(p.tiltAngle) * 15;

            if (p.y > confetti.height) {
                p.x = Math.random() * confetti.width;
                p.y = -10;
                p.tilt = Math.floor(Math.random() * 10) - 10;
            }
        }
    }

    (function animate() {
        requestAnimationFrame(animate);
        draw();
    })();
}
