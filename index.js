import data from './data.js';

let blurShown = false;
let currentQuestionIndex = undefined;
let currentColumnIndex = undefined;

const categoryWrapper = document.querySelector('.category-wrapper')
const questionWrapper = document.querySelector('.question-wrapper');
const blurWrapper = document.querySelector('.blur-wrapper');
const questionText = document.querySelector('.question-text');
const correctButton = document.querySelector('.correct-button');
const showAnswerButton = document.querySelector('.show-button');
const answerText = document.querySelector('.answer-text');

const onClickCorrectButton = () => {
    onClickAway();
    const currentSquare = document.getElementById(`${currentColumnIndex}/${currentQuestionIndex}`);
    currentSquare.className = 'question-block green-square';
}

const onClickShowAnswer = () => {
    answerText.className = 'answer-text shown';
}

const onClickAway = () => {
    if (blurShown) {
        const currentSquare = document.getElementById(`${currentColumnIndex}/${currentQuestionIndex}`);

        answerText.className = 'answer-text';
        currentSquare.className = 'question-block red-square';
        blurWrapper.className = 'blur-wrapper';
        questionWrapper.className = 'question-wrapper';
        blurShown = false;
    }
}

correctButton.onclick = onClickCorrectButton;
showAnswerButton.onclick = onClickShowAnswer;
blurWrapper.onclick = onClickAway;

data.forEach((column, columnIndex) => {
    const columnEl = document.createElement("div");
    const titleText = document.createTextNode(column.title);
    const titleEl = document.createElement("h2");

    columnEl.className = "column-wrapper";

    titleEl.appendChild(titleText);
    columnEl.appendChild(titleEl);
    categoryWrapper.appendChild(columnEl);

    column.questions.forEach((question, questionIndex) => {
        const el = document.createElement("div");
        const titleText = document.createTextNode(`${questionIndex + 1}.`);

        el.className = "question-block";
        el.id = `${columnIndex}/${questionIndex}`;
        el.onclick = (e) => {
            if (!blurShown) {
                e.stopPropagation();
                questionWrapper.className += ' question-shown';
                blurWrapper.className += ' blurred-now';
                questionText.textContent = question;
                answerText.textContent = column.answers[questionIndex];
                currentQuestionIndex = questionIndex;
                currentColumnIndex = columnIndex;
                blurShown = true;
            }
        }

        el.appendChild(titleText);
        columnEl.appendChild(el);
    })
});
