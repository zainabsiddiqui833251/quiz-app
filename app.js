//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Which of the following is not a JavaScript keyword?",
        options: ["const", "let", "var", "function"],
        correct: "let",
    },
    {
        id: "1",
        question: "The content of the page (such as your pictures, text, links) will show up here",
        options: ["footer", "body", "style", "head"],
        correct: "body",
    },
    {
        id: "2",
        question: "The default link color for hyperlinks:",
        options: ["black", "blue", "yellow", "red"],
        correct: "blue",
    }, {
        id:"3",
        question: "What is the name of the CSS selector to style the element with id named car?",
        options: [".car",
            "#car",
            "$car",
            "car",],
        correct: "#car",
    },
    {id: "4",
        question: "What is a variable?",
        options:[ "Store values so we can use them later and change them from the code.",
        "Store values so we can use them but cannot change them.",
         "Store values so we can use them once.",
        "Store values in containers so we can't use them later.",],
        correct: "Store values so we can use them later and change them from the code."
    },
    {
        id:"5",
        question: "JavaScript files have the file extension (the bit after the name):",
        options:[ ".js",
         ".html",
         ".java",
         ".script"],
        correct: ".js"
    },
    {id:"6",
        question: "Select the rule set to make all the text in your web page blue and centered.",
        options:["p {color: blue;}",
         "body {text- align: left;color: blue;}",
         "p {text-align: center;color: blue;}",
         "body {text-align: center;color: blue;}"],
        correct: "body {text-align: center;color: blue;}",

    },
    {
      id:"7",
        question: "CSS rules are enclosed with ___________?",
        options: ["<>",
         "{}",
         "[]",
 "()"],
        correct: "{}"
    },
    {
     id:"8", question: "Where in an HTML document is the correct place to refer to an external style sheet (such as style.css)?",
        options: ["In the head section",
         "In the body section",
         "At the end of the document",
         "In the css section"],
        correct: "In the <head> section"
    },
    {
        id:"9",
        question: "In what year was javascript launched?",
       options: ["1996",
        "1998",
        "1994",
        "none of the above"],
        correct: "none of the above"
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};