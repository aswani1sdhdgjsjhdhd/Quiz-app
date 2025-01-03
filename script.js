const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Nepal", correct: false},
            {text: "Laos", correct: false},
            {text: "Sri Lanka", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Antarctica", correct: true},
            {text: "Sahara", correct: false}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Europe", correct: false},
            {text: "Australia", correct: true},
            {text: "Antartica", correct: false},
            {text: "Africa", correct: false}
        ]
    }
];

const questionbtn = document.getElementById("question");
const answerbtn = document.getElementById("answer-buttons");
const nextbtn = document.getElementById("next-btn");


let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionbtn.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML  = answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextbtn.style.display = "none";
    while(answerbtn.firstChild) {
        answerbtn.removeChild(answerbtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbtn.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

function showScore() {
    resetState();
    questionbtn.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
}

function handleNextButton() {
    currentQuesIndex++;
    if(currentQuesIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextbtn.addEventListener("click", () => {
    if(currentQuesIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();
