// Variables declaration
let startButton = document.getElementById('start-button');
let introQuiz = document.getElementById('intro');
let nextButton = document.getElementById('next-button');
let finishButton = document.getElementById('finish-button');
let correctMessage = document.getElementById('correct-message');
let incorrectMessage = document.getElementById('#incorrect-message');
let questionDevice = document.getElementById('question-device');
let scoreDevice = document.getElementById('score-device');
let highScores = document.getElementById('high-scores');
let submitButton = document.getElementById('submit-button');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');
let shuffleQuestions, currentQuestion;

// Function: start Quiz / shuffle questions / setting countdown timer
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestion++;
    nextQuestion();
})
finishButton.addEventListener('click', () => {
    questionDevice.classList.add('hide'); 
    scoreDevice.classList.remove('hide');
    startButton.classList.add('hide');
    finishButton.classList.add('hide');
    document.body.classList.remove('correct', 'incorrect');
})

function startQuiz() {
    startButton.classList.add('hide');
    highScores.classList.add('hide');
    introQuiz.classList.add('hide');
    questionDevice.classList.remove('hide');
    
    shuffleQuestions = questionPool.sort(() => Math.random() - .5)
    currentQuestion = 0
    nextQuestion()
    // Setting timer / 60 seconds countdown
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
    // Using setTimeout to end quiz / final score /  enter initials
    setTimeout (showScore, 60000)
    function showScore() {
        questionDevice.classList.add('hide'); 
        scoreDevice.classList.remove('hide');
        startButton.classList.add('hide');
        finishButton.classList.add('hide');
        document.body.classList.remove('correct', 'incorrect');
    }
}

// Function: Go to next question / shuffle questions
function nextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestion]);
}
// Function: Showing questions / shuffling questions
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
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild 
        (answerButtonsElement.firstChild);
    }
}
// Function: Select answer / showing correct / incorrect
function selectAnswer(e) {
    let selectButton = e.target;
    let correct = selectButton.dataset.correct;
    setStatus(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    });
    if (shuffleQuestions.length > currentQuestion +1) {
        nextButton.classList.remove('hide');
    }
    else {
        finishButton.classList.remove('hide');
    }

    function setStatus(element, correct) {
        // clearStatus(element)
        if (correct) {
            element.classList.add('correct');
        }
        else {
            element.classList.add('incorrect');
        }
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

// show high scores / clear high scores and restart quiz
function renderLastRegistered() {
    let name = localStorage.getItem("initials");
  
    if (!name) {
      return;
    }
  
    userNameSpan.textContent = name;
  }

submitButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    highScores.classList.remove('hide');
    scoreDevice.classList.add('hide');

    let initials = document.querySelector('registered-score').value;
  
    if (initials === "") {
      displayMessage("error", "Please enter initials");
    } else {
      displayMessage("Initials submitted");
  
      localStorage.setItem("initials", name);
      renderLastRegistered();
    }
  });