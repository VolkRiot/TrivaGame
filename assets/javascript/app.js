

var questionsList = [
  {
    question: "This is a question?",
    answers: ["Answer1", "Answer2", "Answer3", "Answer4"]
  },
  {
    question: "Here is another question? Possibly?",
    answers: ["Answer1", "Answer2", "Answer3", "Answer4"]
  },
  {
    question: "Ok, let's just pretend that these here are real questions. Ok?",
    answers: ["Answer1", "Answer2", "Answer3", "Answer4"]
  }
];


$(document).ready(function () {

  $('#question-well').html(questionsList[0].question);



});
