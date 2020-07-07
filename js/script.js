// Variables declaration
let startButton = document.getElementById('start-button');
let nextButton = document.getElementById('next-button');

let questionDevice = document.getElementById('question-device');

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
    questionDevice.classList.remove('hide');
    shuffleQuestions = questionPool.sort(() => Math.random() - .5)
    currentQuestion = 0

    nextQuestion()

}
// Go to next question
function nextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestion]);
}

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
function resetState() {
    clearStatus(document.body);
    nextButton.classList.add('hide');
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

function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct');
    }
    else {
        element.classList.add('incorrect');
    }
}



function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

// Answers true / false / modify timer
let questionPool = [
    {
        question: 'Q: String values must be enclosed within ______ when being assigned to variables.',
        answers: [
            { text: '1. commas', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. quotes',  correct: true },
            { text: '4. parentheses', correct: false},
        ]
    },
    {
        question: 'Q: Arrays in JavaScript can be used to store ______.',
        answers: [
            { text: '1. numbers and strings', correct: false },
            { text: '2. other arrays', correct: false },
            { text: '3. booleans',  correct: false },
            { text: '4. all of the above', correct: true},
        ]
    },
    {
        question: 'Q: The condition in ab if / else statement is enclosed within ______.',
        answers: [
            { text: '1. quotes', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. parentheses',  correct: true },
            { text: '4. square brackets', correct: false},
        ]
    }
]



// Set the timer

// let totalSeconds = 60*10;
// let countMin = parseInt(totalSeconds/60);
// let countSec = parseInt(totalSeconds%60);

// function quizTimer(){
//     document.getElementById("quiz-timer")
//     = 'Time left: ' + countMin + ' minutes ' + countSec + ' seconds';
//     if (totalSeconds <=0) {
//         setTimeout('document.quiz.submit()', 1);
//     }
//     else {
//         totalSeconds = totalSeconds -1;
//         countMin = parseInt(totalSeconds/60); 
//         countSec = parseInt(totalSeconds%60);
//         setTimeout("CheckTime()", 1000);
//     }
// }

// Function: Show final score /  enter initials


// show high scores / clear high scores and restart quiz