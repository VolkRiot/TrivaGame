var masterQuestionsList = [
  {
    questionMain: "What was Rick's favorite exhibit in Anatomy Park?",
    answers: ["The Bone Train", "Bladder Falls", "Pirates of the Pancreas", "Spleen Mountain"],
    correctIndex: 2,
    img: "anatomyPark.png",
    reward: "piratesrapey.gif",
    panelShowTime: 5
  },
  {
    questionMain: "What does Snuffles want to be called now that he abandoned his slave name?",
    answers: ["Snowball", "Whitefur", "Morty the Dog", "Morphius"],
    correctIndex: 0,
    img: "slavename.gif",
    reward: "snowball.gif",
    panelShowTime: 4
  },
  {
    questionMain: "Rick and Morty was based off an animated short originally titled what?",
    answers: ["Wubalubadubdub", "Adventures of Morty and Doc", "Futurama", "The Real Adventures of Doc and Mharti"],
    correctIndex: 3,
    img: "originalAdventure.png",
    reward: "yes.gif",
    panelShowTime: 1
  },
  {
    questionMain: "What does Rick tell the alien inhabitants of his 'micro-verse' this gesture mean?",
    answers: ["Greetings!", "I bring you gifts", "Peace among worlds", "Fuck off"],
    correctIndex: 2,
    img: "aliengesture.gif",
    reward: "peaceamongworlds.gif",
    panelShowTime: 3
  },
  {
    questionMain: "What was the name of Rick and Morty's world-saving hit song?",
    answers: ["Get Schwifty", "Spare da Earth", "Feel Good Inc.", "DoYaThing"],
    correctIndex: 0,
    img: "getSchwifty.jpg",
    reward: "goodjob.gif",
    panelShowTime: 3
  },
  {
    questionMain: "What is the purpose of this little robot created by Rick at the breakfast table?",
    answers: ["Spy on the Neighbors", "Pass the butter", "Pour some OJ", "Bend girders"],
    correctIndex: 1,
    img: "littlerobot.gif",
    reward: "passbutter.gif",
    panelShowTime: 11
  },
  {
    questionMain: "What did Jerry ask the Mr. Meeseeks to help him accomplish?",
    answers: ["Become popular", "Become rich", "Take two strokes off golf game", "Get promoted at work"],
    correctIndex: 2,
    img: "meeseeks.gif",
    reward: "sucksmeeseeks.gif",
    panelShowTime: 3
  },
  {
    questionMain: "What is the most popular virtual reality game at Blips and Chitz?",
    answers: ["Roy", "Star Killer", "Earth Game", "Grand Theft Spaceship"],
    correctIndex: 0,
    img: "blipsnchitz.gif",
    reward: "topgame.gif",
    panelShowTime: 3
  },
  {
    questionMain: "Morty accidentally becomes the father of a violent warmongering breed of alien from what planet?",
    answers: ["Gazorpazorp", "Squanchy", "Flim-flam", "Pluto"],
    correctIndex: 0,
    img: "destruction.gif",
    reward: "fatherlyadvice.gif",
    panelShowTime: 4
  },
  {
    questionMain: "After barely escaping his knives, Rick and Morty incept the nightmare of monster Scary Terry and befriend him by offering him what?",
    answers: ["Pair of pants", "Advice on his marriage", "Hugs", "Money"],
    correctIndex: 0,
    img: "scaryterryrun.gif",
    reward: "awwbitch.gif",
    panelShowTime: 2
  }
];

var lastQuestion = false;
var stats = {
  correct: 0,
  incorrect: 0,
  unanswered: 0
};

var questionsList = $.map(masterQuestionsList, function (obj) {
  return $.extend(true, {}, obj);});

var answerTimeSec = 8;
var failGifs = ["badperson.gif", "donthate.gif"];
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

  if(answered !== true){
    stats.unanswered++;
  }
  answered = false;

  if(!lastQuestion) {
    currentQuestion = randomQuestion(questionsList);
    buildQuestion(currentQuestion);
    clearTimeout(nextQTimer);
    countDown();
  }else{
    // TODO: Display a final panel with the total score
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

function buildIntermediatePanel(correct) {

  var image;

  if(correct){
    image = $('<img class="img-responsive center-block">').attr('src', "assets/images/" + currentQuestion.reward);
  }else{
    image = $('<img class="img-responsive center-block">').attr('src', "assets/images/" + failGifs[Math.floor(Math.random() * failGifs.length)]);
  }
  
  $('#presentation-panel').html(image)
}

function buildFinalPanel() {

  var $finalPanel = $('#presentation-panel');
  $finalPanel.empty();
  $finalPanel.addClass('text-center');
  $finalPanel.append("<p class='h4'>Final Score");
  $finalPanel.append("<p class='h4'>Correct: " + stats.correct);
  $finalPanel.append("<p class='h4'>Incorrect: " + stats.incorrect);
  $finalPanel.append("<p class='h4'>Unanswered: " + stats.unanswered);
  $finalPanel.append('<button class="btn btn-warning" id="restart-button">Restart</button>');

  $('#trivia-panel').hide();
  $finalPanel.show()
}

$(document).ready(function () {


  $('#start').on('click', function () {
    togglePanels();

    $('#presentation-panel').empty();

    // Initial call to build first question.
    answered = true;
    nextQuestion();
  });

  $(".questions-container").on('click', '.answer-choices', function () {

    answered = true;

    if($(this).attr('data-index') == currentQuestion.correctIndex){
      // Result of correct response goes here!
      stats.correct++;
      buildIntermediatePanel(true);


    }else{
      //Incorrect Response here
      stats.incorrect++;
      buildIntermediatePanel();
    }

    stopTime();
    togglePanels();

    if(!lastQuestion){
      setTimeout(showPaneltoNewQuestion, currentQuestion.panelShowTime * 1000);
    }else{
      setTimeout(buildFinalPanel, currentQuestion.panelShowTime * 1000);
    }

  });

  $('#presentation-panel').on('click', "#restart-button", function () {

      for(var item in stats){
        stats[item] = 0;
      }
      lastQuestion = false;

      questionsList = $.map(masterQuestionsList, function (obj) {
      return $.extend(true, {}, obj);
      });

      togglePanels();
      nextQuestion();
  });

});
