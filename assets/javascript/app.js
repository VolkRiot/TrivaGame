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
  }
];

function randomQuestion(questionObj) {
  return questionObj[Math.floor(Math.random() * questionObj.length)];
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


$(document).ready(function () {



  buildQuestion(randomQuestion(questionsList));



});
