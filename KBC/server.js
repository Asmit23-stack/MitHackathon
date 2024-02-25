const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.querySelector('.next-button');

let currentQuestionIndex = 0;

const questions = [
  {
    question: 'What is the capital of France?',
    answers: ['Berlin', 'Paris', 'Madrid', 'Rome'],
    correctAnswer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars'
  },
  {
    question: 'What is the largest mammal in the world?',
    answers: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 'Blue Whale'
  }
];

function startGame() {
  currentQuestionIndex = 0;
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  answerButtons.innerHTML = '';
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('answer-button');
    button.addEventListener('click', () => selectAnswer(answer, question.correctAnswer));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedAnswer, correctAnswer) {
  const isCorrect = selectedAnswer === correctAnswer;
  if (isCorrect) {
    // Handle correct answer logic (e.g., increase score)
    console.log('Correct!');
  } else {
    // Handle incorrect answer logic (e.g., show correct answer)
    console.log('Incorrect. Correct answer is: ' + correctAnswer);
  }

  // Disable answer buttons after selection
  document.querySelectorAll('.answer-button').forEach(button => {
    button.disabled = true;
  });

  // Show the 'Next' button
  nextButton.style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    // Enable answer buttons for the new question
    document.querySelectorAll('.answer-button').forEach(button => {
      button.disabled = false;
    });
    // Hide the 'Next' button
    nextButton.style.display = 'none';
  } else {
    // End of the quiz, handle as needed
    alert('End of the quiz!');
  }
}

// Start the quiz when the page loads
startGame();
