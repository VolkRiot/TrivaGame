var questionsList = [
  {
    questionMain: "What was Rick's favorite exhibit in Anatomy Park?",
    answers: ["The Bone Train", "Bladder Falls", "Pirates of the Pancreas", "Spleen Mountain"],
    correctIndex: 2,
    img: "anatomyPark.png"
  },
  {
    questionMain: "What does Snuffles want to be called now that he abandoned his slave name?",
    answers: ["Snowball", "Whitefur", "Morty the Dog", "Morphius"],
    correctIndex: 0,
    img: "snuffles.jpg"
  },
  {
    questionMain: "Rick and Morty was based off an animated short originally titled what?",
    answers: ["Wubalubadubdub", "Adventures of Morty and Doc", "Futurama", "The Real Adventures of Doc and Mharti"],
    correctIndex: 3,
    img: "originalAdventure.png"
  },
  {
    questionMain: "What does Rick tell the alien inhabitants of his 'micro-verse' this gesture mean?",
    answers: ["Greetings!", "I bring you gifts", "Peace among worlds", "Fuck off"],
    correctIndex: 2,
    img: "alienGesture.png"
  },
  {
    questionMain: "What was the name of Rick and Morty's world-saving hit song?",
    answers: ["Get Schwifty", "Spare da Earth", "Feel Good Inc.", "DoYaThing"],
    correctIndex: 0,
    img: "getSchwifty.jpg"
  }
];

var lastQuestion = false;
var stats = {
  correct: 0,
  incorrect: 0,
  unanswered: 0
};

// TODO: This is a temp value for testing change this later
var answerTimeSec = 70;
var panelShowTime = 3;
var timer = answerTimeSec;
var countdownIterator;
var nextQTimer;
var currentQuestion;
var answered = false;

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
  var mainQuestion = $("<p class='h5 main-question'>");

  mainQuestion.html(questionObj.questionMain);

  $('#question-well').html(mainQuestion);
  $('#question-image').attr('src', 'assets/images/' + questionObj.img);
  $('.questions-container').empty();


  for(var i = 0; i < answersArray.length/2; i++){

    $('#question-box1').append(buildAnswer(questionObj.answers[i]));
    $('#question-box2').append(buildAnswer(questionObj.answers[i + 2]));

  }
}

function nextQuestion() {

  answered = false;

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

function togglePanels() {

  if($('#trivia-panel').is(":visible")) {
    $('#trivia-panel').hide();
    $('#presentation-panel').show();
  }else{
    $('#presentation-panel').hide();
    $('#trivia-panel').show();
  }
}

function showPaneltoNewQuestion() {
  togglePanels();
  nextQuestion();
}

function buildIntermediatePanel() {

  var image = $('<img class="img-responsive center-block">').attr('src', "assets/images/goodjob.gif");

  $('#presentation-panel').html(image)
}

$(document).ready(function () {


  $('#start').on('click', function () {
    togglePanels();

    $('#presentation-panel').empty();

    nextQuestion();
  });

  $(".questions-container").on('click', '.answer-choices', function () {

    answered = true;


    if($(this).attr('data-index') == currentQuestion.correctIndex){
      // Result of correct response goes here!
      stats.correct++;

      // TODO: Build a function which assembles the content of a winning #reaction-container


    }else{
      //Incorrect Response here
      stats.incorrect++;

      // TODO: Build a function which assembles the content of a losing #reaction-container

    }

    stopTime();
    buildIntermediatePanel();
    togglePanels();
    setTimeout(showPaneltoNewQuestion, panelShowTime * 1000);

  });

});
