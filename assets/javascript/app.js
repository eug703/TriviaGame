let counter = 30;
let currentQuestion = 0;
let score = 0;
let loss = 0;
let timer;

function nextQuestion(){
    const outOfQuestions = (quizQuestions.length - 1) === currentQuestion;
    if(outOfQuestions){
        console.log("game over");
        displayResult();
    }
    else{
        currentQuestion++;
        loadQuestion();
    }
}

function timeUp(){
    clearInterval(timer);
    loss++;
    nextQuestion();
}

function countDown(){
    counter--;
    $("#time").html("Timer: " + counter);
    if(counter === 0){
        timeUp();
    }
}


function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);
    
    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $("#time").html("Timer: " + counter);
    $("#game").html(` 
        <h3>${question}</h3>
        ${loadChoices(choices)}
        ${loadRemainingQuestions()}
    `);
    // $("#game").html("<h3>" + question + "</h3>");
}

function loadChoices(choices){
    let result = "";

    for (let i = 0; i < choices.length; i++){
        result += `<p class = "choice" data-answer="${choices[i]}"> ${choices[i]} </p>`;
    }
    return result;
}




$(document).on("click", ".choice", function(){
    clearInterval(timer);
    const selectedAnswer = $(this).attr("data-answer");
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if(correctAnswer === selectedAnswer){
        score++;
        nextQuestion();
        console.log("win");
    }

    else{
        loss++;
        nextQuestion();
        console.log("lose");
    }
    console.log ("button test works", selectedAnswer);
});

function displayResult(){
     const result= `
     <p>You got ${score} questons right</p>
     <p>You missed ${loss} questons</p>
     <p>Questions answered:  ${quizQuestions.length}</p>
     <button class="btn btn-primary" id="reset">Reset Game</button>
     `;
     $("#game").html(result);
}

$(document).on("click", "#reset", function(){
     counter = 30;
    currentQuestion = 0;
    score = 0;
    loss = 0;
    timer = null;

    loadQuestion();
    // console.log("reset button test");

});

function loadRemainingQuestions(){
    const remainingQuestions=quizQuestions.length - (currentQuestion+1);
    const totalQuestions = quizQuestions.length;

    return `Remaining Questions: ${remainingQuestions}/${totalQuestions}`;
}

loadQuestion();