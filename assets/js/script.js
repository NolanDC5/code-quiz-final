var answer1 = document.createElement('button');
var answer2 = document.createElement('button');
var answer3 = document.createElement('button');
var answer4 = document.createElement('button');
var time = questions.length * 15;
var currentQuestionIndex = 0; 

var startButton = document.querySelector("#startbutton");
var questionsSec = document.querySelector("#questions-section");
var timerEl = document.querySelector("#time");
var answerSelection = document.querySelector("#answerlist");
var startScreen =  document.querySelector(".start-section");
var titleEl = document.querySelector("#questiontitle");
var endSection = document.querySelector("#end-section");
var initials = document.querySelector("#initials");
var score = document.querySelector("#score");
var submitButton = document.querySelector("#submitbutton");
var buttons = document.querySelectorAll(".button");



function startQuiz(event){
    event.preventDefault();
    startScreen.setAttribute("class", "hidden");
    questionsSec.setAttribute("class", "visible");
    getCurrentQuestion();
    startTimer();
}

function startTimer() {
      var timer = setInterval(function() {
      time--;
      timerEl.textContent = time;

     if (time <= 0) {
      time = 0;
      timerEl.textContent = 0;
      clearInterval(timer);
      endQuiz();
      }
    }, 1000);
}


function getCurrentQuestion(){

    var currentQuestion = questions[currentQuestionIndex];
    console.log('curretnQuestion-->',currentQuestion)
    titleEl.textContent = currentQuestion.question;
   
   
      answer1.setAttribute('content', '1');
      answer1.setAttribute('class', 'button');  
      answer1.textContent = currentQuestion.choices[0];
      answer1.addEventListener("click", rightwrong);
      answerSelection.appendChild(answer1);
   
     
      answer2.setAttribute('content', '2');
      answer2.setAttribute('class', 'button');  
      answer2.textContent = currentQuestion.choices[1];
      answer2.addEventListener("click", rightwrong);
      answerSelection.appendChild(answer2);
      
   
      answer3.setAttribute('content', '3');
      answer3.setAttribute('class', 'button');  
      answer3.textContent = currentQuestion.choices[2];
      answer3.addEventListener("click", rightwrong);
      answerSelection.appendChild(answer3);
      
   
      answer4.setAttribute('content', '4');
      answer4.setAttribute('class', 'button');  
      answer4.textContent = currentQuestion.choices[3];
      answer4.addEventListener("click", rightwrong);
      answerSelection.appendChild(answer4);
   
}
   

function rightwrong(event){
    event.preventDefault();

    if(event.target.textContent === questions[currentQuestionIndex].answer){ 
          currentQuestionIndex++;
          if (currentQuestionIndex < questions.length){
             getCurrentQuestion();
          } else {
                endQuiz()
          }
         
    } else {
        
        time = time - 10;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length){
            getCurrentQuestion();
        } else {
             endQuiz()
        }
    }
 }



function endQuiz() {
    startScreen.setAttribute("class", "hidden");
    questionsSec.setAttribute("class", "hidden");
    endSection.setAttribute("class", "visible");
    
    score.textContent = time;
}

function initials(){
    if (document.getElementById('input').value != "") {
        var highScores =
          JSON.parse(window.localStorage.getItem("highscores")) || [];
    
        
        var newScore = {
          initials: document.getElementById('input').value,
          score: time,
        };
    
        highScores.push(newScore);
    
        window.localStorage.setItem("highscores", JSON.stringify(highScores));
    
        
        window.location.href = "highscores.html";
      }
    
}





if(submitButton){
submitButton.addEventListener("click", initials);
}

if(startButton){
startButton.addEventListener("click", startQuiz);
}