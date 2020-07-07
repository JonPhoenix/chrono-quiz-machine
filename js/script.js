// Variables declaration
let startButton = document.getElementById('start-button');
let introQuiz = document.getElementById('intro');
let nextButton = document.getElementById('next-button');

let correctSign = document.getElementById('correct-sign');
let incorrectSign = document.getElementById('incorrect-sign');

let questionDevice = document.getElementById('question-device');
let scoreDevice = document.getElementById('score-device');

let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');

let shuffleQuestions, currentQuestion;

// Function: start Quiz / shuffle questions
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestion++;
    nextQuestion();
})
function startQuiz() {
    startButton.classList.add('hide');
    introQuiz.classList.add('hide');
    questionDevice.classList.remove('hide');
    shuffleQuestions = questionPool.sort(() => Math.random() - .5)
    currentQuestion = 0
    nextQuestion()

    let startingMinutes = 1;
    let time = startingMinutes * 60;
    let countdownEl = document.getElementById('countdown');
    setInterval(updateCountdown, 1000);
    function updateCountdown() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds

        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--;
    }
    setTimeout (showScore, 60000)
    function showScore() {
        questionDevice.classList.add('hide'); 
        scoreDevice.classList.remove('hide');
    }
}
// Function: Go to next question / shuffle questions
function nextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestion]);
}
// Function: Go to next question / shuffle questions
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}
// Function: Reset the page for the next question
function resetState() {
    clearStatus(document.body);
    nextButton.classList.add('hide');
    correctSign.classList.add('hide');
    // incorrectSign.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild (answerButtonsElement.firstChild);
    }
}
// Function: Select answer
function selectAnswer(e) {
    let selectButton = e.target;
    let correct = selectButton.dataset.correct;
    setStatus(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    });
    if (shuffleQuestions.length > currentQuestion +1) {
        nextButton.classList.remove('hide');
    }
    else {
        startButton.innerText = "Restart";
        startButton.classList.remove('hide');
    }
}
// Answers correct / incorrect / change buttons
function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct'); 
        correctSign.classList.remove('hide');
    }
    else {
        element.classList.add('incorrect');
        correctSign.classList.add('hide');
        //incorrectSign.classList.remove('hide');
    }
}
// Function: Reset answer buttons for the next question
function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}
// let questionPool on questions.js file
let script = document.createElement('script');
script.src = 'js/questions.js';
document.head.appendChild(script)
// Set the countdown / timer




// Function: Show final score /  enter initials


// show high scores / clear high scores and restart quiz