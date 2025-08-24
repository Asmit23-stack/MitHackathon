// script.js

// --- DOM Element References ---
const questionEl = document.getElementById('question');
const answerInputEl = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const levelEl = document.getElementById('level');

// The URL of our Python backend.
// Since the python app is running on port 5000 on your machine, this is the address.
const API_URL = 'http://127.0.0.1:5000';

// --- Functions ---

async function startGame() {
    try {
        const response = await fetch(`${API_URL}/start`);
        if (!response.ok) {
            throw new Error('Could not connect to the server.');
        }
        const data = await response.json();
        updateUI(data.question, data.level);
    } catch (error) {
        questionEl.textContent = 'Error starting the game. Is the backend running?';
        console.error(error);
    }
}

async function submitAnswer() {
    const userAnswer = answerInputEl.value;
    if (userAnswer === '') {
        feedbackEl.textContent = 'Please enter an answer.';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer: userAnswer }),
        });

        if (!response.ok) {
            throw new Error('Server responded with an error.');
        }

        const data = await response.json();

        // Update feedback text and color
        feedbackEl.textContent = data.feedback;
        feedbackEl.className = data.was_correct ? 'correct' : 'incorrect';

        // Update the UI with the next question
        updateUI(data.next_question, data.new_level);
        
        // Clear the input field for the next answer
        answerInputEl.value = '';

    } catch (error) {
        feedbackEl.textContent = 'Could not submit answer. Check server connection.';
        console.error(error);
    }
}

function updateUI(question, level) {
    questionEl.textContent = question;
    levelEl.textContent = level;
}

// --- Event Listeners ---

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', startGame);

// Handle click on the submit button
submitBtn.addEventListener('click', submitAnswer);

// Allow pressing 'Enter' key to submit answer
answerInputEl.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        submitAnswer();
    }
});