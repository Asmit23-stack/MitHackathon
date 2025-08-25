const options = document.querySelectorAll(".option");

options.forEach(option => {
  option.addEventListener("click", () => {
    // Remove 'selected' from all
    options.forEach(opt => opt.classList.remove("selected"));
    
    // Add 'selected' to clicked one
    option.classList.add("selected");
  });
});


let questions = [];
let currentIndex = 0;
let score = 0;
let selectedAnswers = [];
let timeLeft = 600; // 10 minutes

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.querySelector(".time");
const currentEl = document.querySelector(".current");
const pointsEl = document.querySelector(".point");

async function fetchQuestions() {
  try {
    // Generate 10 random algebra problems
    questions = Array.from({ length: 10 }, () => {
      let a = Math.floor(Math.random() * 9) + 2;
      let b = Math.floor(Math.random() * 10) + 1;
      let x = Math.floor(Math.random() * 10) + 1;
      let qText = "";
      let answer = x;

      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        let c = a * x + b;
        qText = `Solve for x: ${a}x + ${b} = ${c}`;
      } else if (type === 1) {
        let c = a * x - b;
        qText = `Solve for x: ${a}x - ${b} = ${c}`;
      } else if (type === 2) {
        let c = (a * x) / b;
        qText = `Solve for x: (${a}x) ÷ ${b} = ${c}`;
      }

      let opts = [answer.toString()];
      while (opts.length < 4) {
        let wrong = answer + (Math.floor(Math.random() * 6) - 3);
        if (wrong >= 0 && !opts.includes(wrong.toString())) {
          opts.push(wrong.toString());
        }
      }
      opts.sort(() => Math.random() - 0.5);

      return {
        q: qText,
        options: opts,
        answer: opts.indexOf(answer.toString())
      };
    });

    selectedAnswers = Array(questions.length).fill(null);
    loadQuestion(currentIndex);
    startTimer();
  } catch (error) {
    console.error("Error generating questions:", error);
    questionEl.textContent = "Failed to load questions 😢";
  }
}

function loadQuestion(index) {
  const q = questions[index];
  questionEl.textContent = q.q;
  currentEl.textContent = `Question: ${index + 1} of ${questions.length}`;
  
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;

    if (selectedAnswers[index] === i) {
      div.classList.add("selected");
    }

    div.onclick = () => {
      selectedAnswers[index] = i;
      document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      div.classList.add("selected");
    };
    optionsEl.appendChild(div);
  });
}

function startTimer() {
  const interval = setInterval(() => {
    timeLeft--;
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;
    timerEl.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      endTest();
    }
  }, 1000);
}

function endTest() {
  score = 0;
  let attempted = 0;
  selectedAnswers.forEach((ans, i) => {
    if (ans !== null) {
      attempted++;
      if (ans === questions[i].answer) score += 10;
    }
  });
  let accuracy = attempted ? ((score / (attempted * 10)) * 100).toFixed(2) : 0;

  document.querySelector(".box").innerHTML = `
    <div class="result-box">
      <h2>Test Completed 🎉</h2>
      <p>Total Questions: ${questions.length}</p>
      <p>Attempted: ${attempted}</p>
      <p>Score: ${score}</p>
      <p>Accuracy: ${accuracy}%</p>
    </div>
  `;
}

document.querySelector(".btn-next").onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  } else {
    endTest();
  }
};

document.querySelector(".btn-prev").onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
  }
};

document.querySelector(".btn-skip").onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  }
};

window.onload = fetchQuestions;


// sidebar
   const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
       if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }