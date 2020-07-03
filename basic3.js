'use strict';

/* quiz app */

(function init () {
const QuizData = [
    { question: 'What is the fastest bird by flying speed?', options: [ 'swift', 'crow', 'hummingbird' ], answer: 'swift' },
    { question: 'Who is the first pyscycologist among phylosopers.', options: [ 'Nitzchie', 'Freud', 'Jung' ], answer: 'Nitzchie' },
    { question: 'Which country is known as subcontient?', options: [ 'USA', 'Russia', 'India' ], answer: 'India' },
];

/* above var contains all the data of the quiz */

/* create an event listner for start button */
document.querySelector('#next').onclick = addQuestion;

let questionNumber = 0;

function addQuestion () {
    const quizDiv = document.querySelector('#quizDiv');
    // quizDiv will be the div into which we will inject questions and
    // options


    const question = document.createElement('h1');
    // an empty h1 tag where question will be injetced
    let score = document.querySelector('#count').innerHTML;
    // score will increment when the right option is selected
    // or will decrement when the wrong option is selected

    // using conditional statements we will add question for every clcik
    // on the next button , until the end of the arrey.
    if (questionNumber === QuizData.length) {
        // condition to exicute at the end or array
        // document.querySelector('#quizDiv').innerHTML = 'You have finished the quiz.';
        document.querySelector('#quizDiv').innerHTML = 'You have finished the quiz. <button id=\'next\'>Start again</button>';
        questionNumber++;
        document.querySelector('#next').onclick = addQuestion;
    } else if (questionNumber > QuizData.length) {
        // condition to excuite when all questions are finished
        questionNumber = 0;
        score = 0;
        document.querySelector('#count').innerHTML = score;
        document.querySelector('#quizDiv').innerHTML = '';
        addQuestion();
    } else {
        // condition that adds the question and options
        question.innerHTML = QuizData[questionNumber].question;
        document.querySelector('#quizDiv').appendChild(question);
        for (const option of QuizData[questionNumber].options)
            quizDiv.innerHTML += `<button class='option' data-action=${option} >${option}</button>`;

        const allButtons = document.getElementsByTagName('button');
        // once all the options and questoon is added. We will create
        // funtions that check if the clicked option is the answer to the
        // question and then change score and increment question number

        try {
            document.querySelector('#next').remove();
        } catch {
            // do nothing
        }
        console.log(allButtons);
        // creating a function that checks the option

        const checkAnswer = function (e) {
            const eventOption = e;

            console.log(eventOption.target.innerHTML);

            if (eventOption.target.className === 'option') {
                if (eventOption.target.dataset.action === QuizData[questionNumber].answer) {
                    score++;
                    document.querySelector('#count').innerHTML = score;
                    quizDiv.innerHTML = '';
                    questionNumber++;
                    addQuestion();
                } else {
                    document.querySelector('#count').innerHTML = --score;
                    quizDiv.innerHTML = '';
                    questionNumber++;
                    addQuestion();
                }
            }
        };
        // using event delegation we will assign checkFunction as a response
        // to click event anywhere in the quizDiv

        quizDiv.onclick = checkAnswer;
    }
}
})();
