let factor1, factor2, score = 0, timeLeft = 10, timerInterval;
let currentQuestion = 0, totalQuestions = 5;
let selectedTable = 'all';

function startQuiz() {
    selectedTable = document.getElementById('table-select').value;
    totalQuestions = parseInt(document.getElementById('question-count').value);
    document.querySelector('.start-box').classList.remove('active');
    document.querySelector('.quiz-box').classList.add('active');
    score = 0;
    currentQuestion = 0;
    document.getElementById('score').innerText = `Punkte: ${score}`;
    generateQuestion();
}

function generateQuestion() {
    if (currentQuestion >= totalQuestions) {
        endQuiz();
        return;
    }

    if (selectedTable === 'all') {
        factor1 = Math.floor(Math.random() * 10) + 1;
    } else {
        factor1 = parseInt(selectedTable);
    }

    factor2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById('question').innerText = `${factor1} x ${factor2} = ?`;
    document.getElementById('answer').value = '';
    document.getElementById('result').innerText = '';
    timeLeft = 10;
    document.getElementById('timer').innerText = `Zeit: ${timeLeft}s`;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').innerText = `Zeit: ${timeLeft}s`;
    } else {
        clearInterval(timerInterval);
        document.getElementById('result').innerText = 'Zeit abgelaufen! 😕';
        document.getElementById('result').classList.add('wrong');
        currentQuestion++;
        setTimeout(generateQuestion, 2000);
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const correctAnswer = factor1 * factor2;
    const resultElement = document.getElementById('result');

    if (userAnswer == correctAnswer) {
        resultElement.innerText = 'Richtig! 🎉';
        resultElement.className = 'result correct';
        score++;
    } else {
        resultElement.innerText = `Falsch! Die richtige Antwort ist ${correctAnswer}.`;
        resultElement.className = 'result wrong';
    }

    document.getElementById('score').innerText = `Punkte: ${score}`;
    clearInterval(timerInterval);
    currentQuestion++;
    setTimeout(generateQuestion, 2000);
}

function endQuiz() {
    document.querySelector('.quiz-box').classList.remove('active');
    const summaryElement = document.getElementById('summary');
    summaryElement.innerHTML = `Quiz beendet!<br>Punkte: ${score} von ${totalQuestions}<br>`;

    if (score === totalQuestions) {
        summaryElement.innerHTML += 'Perfekt gemacht! 🌟';
    } else if (score > totalQuestions / 2) {
        summaryElement.innerHTML += 'Gut gemacht! 👍';
    } else {
        summaryElement.innerHTML += 'Weiter üben! Du schaffst das! 💪';
    }

    summaryElement.style.display = 'block';
}

window.onload = function() {
    document.querySelector('.start-box').classList.add('active');
}
