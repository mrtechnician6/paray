// Typewriter
const textArray = "I know things haven't been perfect lately... but i wanna make sure you that i am not gonna do anything wrong. Trust me.";
let charIndex = 0;

function typeEffect() {
    if (charIndex < textArray.length) {
        document.getElementById("typewriter").innerHTML += textArray.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 70);
    }
}

// Start Music & Move to Game
function startExperience(curr, next) {
    const audio = document.getElementById('bgMusic');
    audio.play(); // Perfectly starts on first tap
    nextPage(curr, next);
    startHeartGame();
}

function nextPage(curr, next) {
    document.getElementById(curr).classList.remove('active');
    document.getElementById(next).classList.add('active');
}

// Gamification: Catch the Hearts
let score = 0;
function startHeartGame() {
    const gameArea = document.getElementById('game-area');
    const interval = setInterval(() => {
        if (score >= 5) {
            clearInterval(interval);
            setTimeout(() => nextPage('p2', 'p3'), 1000);
            return;
        }
        
        const heart = document.createElement('div');
        heart.innerHTML = "❤️";
        heart.className = "falling-heart";
        heart.style.left = Math.random() * 90 + "%";
        heart.style.top = "-50px";
        gameArea.appendChild(heart);

        let pos = -50;
        const fall = setInterval(() => {
            if (pos > 300) {
                clearInterval(fall);
                heart.remove();
            } else {
                pos += 2;
                heart.style.top = pos + "px";
            }
        }, 20)

        heart.onclick = () => {
            score++;
            document.getElementById('scoreVal').innerText = score;
            heart.innerHTML = "✨";
            setTimeout(() => heart.remove(), 200);
        };
    }, 1000);
}

window.onload = typeEffect;
