var questionsList = [
  {
    questionMain: "This is a question?",
    answers: ["Answer1", "Answer2", "RightAnswer", "Answer4"],
    correctIndex: 2
  },
  {
    questionMain: "Here is another question? Possibly?",
    answers: ["RightAnswer", "Answer2", "Answer3", "Answer4"],
    correctIndex: 0
  },
  {
    questionMain: "Ok, let's just pretend that these here are real questions. Ok?",
    answers: ["Answer1", "Answer2", "Answer3", "RightAnswer"],
    correctIndex: 3
  },
  {
    questionMain: "I am really, very bad at writing these durn stand-in questions? SEE!",
    answers: ["Answer1", "Answer2", "RightAnswer", "Answer4"],
    correctIndex: 2
  },
  {
    questionMain: "Bananas are a great source of potassium. Shit, this is more of a fact than a question...",
    answers: ["Sherlock?", "Answer2", "Answer3", "Answer4"],
    correctIndex: 0
  }
];

var lastQuestion = false;

// TODO: This is a temp value for testing change this later
var answerTimeSec = 60;
var timer = answerTimeSec;
var countdownIterator;
var nextQTimer;
var currentQuestion;

function randomQuestion(quesList) {
  var randValue = Math.floor(Math.random() * quesList.length);
  
  // We splice the item out of the total array, leaving remaining behind
  return quesList.splice(randValue, 1)[0];
}

function randomizeArray(array) {

  var randArray = [];

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    randArray.push(array[j]);
  }
  return randArray;

}

function buildAnswer(answer) {

  var answerBox = $('<label class="radio">');
  var radioButton = $('<input type="radio" />');
  radioButton.attr('name', 'inlineRadioOptions');
  radioButton.attr('class', 'answer-choices');
  radioButton.attr('data-index', currentQuestion.answers.indexOf(answer));
  answerBox.append(radioButton);

  answerBox.append(answer);

  return answerBox;

}

function buildQuestion(questionObj) {
  var answersArray = randomizeArray(questionObj.answers);
  var mainQuestion = $("<p>");

  mainQuestion.html(questionObj.questionMain);

  $('#question-well').html(mainQuestion);
  $('.questions-container').empty();


  for(var i = 0; i < answersArray.length/2; i++){

    $('#question-box1').append(buildAnswer(questionObj.answers[i]));
    $('#question-box2').append(buildAnswer(questionObj.answers[i + 2]))

  }
}

function nextQuestion() {

  if(!lastQuestion) {
    currentQuestion = randomQuestion(questionsList);
    buildQuestion(currentQuestion);
    clearTimeout(nextQTimer);
    countDown();
  }

  $('#header').html(timer);

}

function countDown() {

  function timerRundown() {
    timer--;
    $('#header').html(timer);
  }

  timer = answerTimeSec;
  nextQTimer = setTimeout(nextQuestion, timer * 1000);

  clearInterval(countdownIterator);
  countdownIterator = setInterval(timerRundown, 1000);

  if(questionsList.length === 0){
    lastQuestion = true;
    clearTimeout(nextQTimer);

    function finalCountdown() {
      clearInterval(countdownIterator);
    }

    setTimeout(finalCountdown, timer * 1000);
  }

}

function stopTime() {
  clearTimeout(nextQTimer);
  clearInterval(countdownIterator);
}

$(document).ready(function () {

  nextQuestion();

  $(".questions-container").on('click', '.answer-choices', function () {


    if($(this).attr('data-index') == currentQuestion.correctIndex){
      nextQuestion();
    }




  });

});
