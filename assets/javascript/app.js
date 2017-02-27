var questionsList = [
  {
    questionMain: "This is a questionMain?",
    answers: ["Answer1", "Answer2", "Answer3", "Answer4"]
  },
  {
    questionMain: "Here is another questionMain? Possibly?",
    answers: ["Answer1", "Answer2", "Answer3", "Answer4"]
  },
  {
    questionMain: "Ok, let's just pretend that these here are real questions. Ok?",
    answers: ["Answer1", "Answer2", "Answer3", "Answer4"]
  }
];

function randomQuestion() {
  return questionsList[Math.floor(Math.random() * questionsList.length)];
}

function buildAnswer(answer) {

  var answerBox = $('<label class="checkbox">');
  answerBox.append($('<input type="checkbox"/>'));
  answerBox.append(answer);

  return answerBox;
  
}

function buildQuestion() {
  var questionObj = randomQuestion();

  $('#question-well').html(questionObj.questionMain);
  $('#question-box1').empty();
  $('#question-box2').empty();


  for(var i = 0; i < questionObj.answers.length/2; i++){

    $('#question-box1').append(buildAnswer(questionObj.answers[i]));
    $('#question-box2').append(buildAnswer(questionObj.answers[i + 2]))

  }

}


$(document).ready(function () {

  buildQuestion();



});
