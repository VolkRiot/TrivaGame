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
var answerTimeSec = 3;
var timer = answerTimeSec;
var countdownIterator;
var nextQTimer;

function randomQuestion(quesList) {
  var randValue = Math.floor(Math.random() * quesList.length);
  
  // We slice the item out of the total array, leaving remaining behind
  return quesList.splice(randValue, 1)[0];
}

function randomizeArray(array) {

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;

}

function buildAnswer(answer) {

  var answerBox = $('<label class="radio">');
  var radioButton = $('<input type="radio" />');
  radioButton.attr('name', 'inlineRadioOptions');
  radioButton.attr('class', 'answer-choices');
  answerBox.append(radioButton);

  answerBox.append(answer);

  return answerBox;

}

function buildQuestion(questionObj) {
  var answersArray = randomizeArray(questionObj.answers);

  $('#question-well').html(questionObj.questionMain);
  $('.questions-container').empty();


  for(var i = 0; i < answersArray.length/2; i++){

    $('#question-box1').append(buildAnswer(questionObj.answers[i], i));
    $('#question-box2').append(buildAnswer(questionObj.answers[i + 2], i + 2))

  }
}

function nextQuestion() {

  if(!lastQuestion) {
    randQuesObj = randomQuestion(questionsList);
    buildQuestion(randQuesObj);
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

$(document).ready(function () {

  nextQuestion();

  $(".questions-container").on('click', '.answer-choices', function () {

    nextQuestion();

  });

});
