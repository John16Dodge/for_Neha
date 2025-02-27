let responses = [];

function createHearts() {
    const heartContainer = document.querySelector(".hearts-container");
    for (let i = 0; i < 20; i++) {
        let heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}

function askQuestion(questionText, options, nextCallback) {
    let questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `<p class="question">${questionText}</p>`;

    options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("answer");
        btn.onclick = () => {
            responses.push({ question: questionText, answer: option });
            localStorage.setItem("nehaResponses", JSON.stringify(responses));
            nextCallback();
        };
        questionContainer.appendChild(btn);
    });
}

function startQuiz() {
    askQuestion("What do I love the most? 💖", ["Your smile 😍", "You 🍫", "We 🐶"], () => {
        askQuestion("If we go on a trip together, where would we go? 🌎", ["Paris 🗼", "Goa 🏖️", "Manali ❄️", "Saudi Arabia 🏜️"], () => {
            askQuestion("How much do I love you? ❤️", ["So much 😘", "Infinity ♾️", "To the moon 🌙"], () => {
                finalQuestion();
            });
        });
    });
}

function finalQuestion() {
    let questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <p class="final-question">Neha, do you love me? 💖</p>
        <button class="answer" onclick="showResponse('yes')">Yes! ❤️</button>
        <button class="answer" onclick="showResponse('no')">No... 😢</button>
    `;
}

function showResponse(answer) {
    let questionContainer = document.getElementById("question-container");

    if (answer === "yes") {
        questionContainer.innerHTML = `
            <img src="happy.gif" alt="Happy" style="width:100%;">
            <p class="final-text">"Mujhe pata tha! Tum meri duniya ho! 😍❤️ acha Listen To the Song"</p>
            <button onclick="playSong()">Play Our Song 🎶</button>
        `;
    } else {
        questionContainer.innerHTML = `
            <img src="sad.gif" alt="Sad" style="width:100%;">
            <p class="final-text">"Oh no! 😭 Par main hamesha tumse pyaar karta rahoonga. 💔 acha Listen To the Song"</p>
        `;
    }

    responses.push({ question: "Do you love me?", answer: answer });
    localStorage.setItem("nehaResponses", JSON.stringify(responses));
}

function playSong() {
    let song = document.getElementById("loveSong");
    song.play().catch(error => console.log("Playback issue: ", error));
}


function viewResponses() {
    let savedResponses = JSON.parse(localStorage.getItem("nehaResponses")) || [];
    let responseText = savedResponses.map(r => `<p>${r.question}: <b>${r.answer}</b></p>`).join("");

    document.getElementById("response-container").innerHTML = responseText;
}
