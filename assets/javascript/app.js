let counter = 5;
let currentQuestion = 0;
let score = 0;
let loss = 0;
let timer;

function nextQuestion(){
    const outOfQuestions = (quizQuestions.length - 1) === currentQuestion;
    if(outOfQuestions){
        console.log("game over");
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
    counter = 5;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;


    $("#time").html("Timer: " + counter);
    $("#game").html(` 
        <h3>${question}</h3>
        ${loadChoices(choices)}
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

loadQuestion();