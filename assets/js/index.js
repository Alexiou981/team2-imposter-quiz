document.addEventListener('DOMContentLoaded', function() {
  const Start = document.querySelector(".play-quiz-btn");
  const answerButtons = document.querySelectorAll(".answer-btn");
  const questionText = document.getElementById("question-text");
  const scoreElement = document.getElementById("score");
  const progressBar = document.getElementById("progress-bar");
  const currentQuestionElement = document.getElementById("current-question");
  const totalQuestionsElement = document.getElementById("total-questions");
  const feedbackElement = document.getElementById("feedback");
  const nextButton = document.querySelector(".next-btn")


  let currentQuestionIndex = 0;
  let score = 0;
  let selectedQuestions = [];
  const TOTAL_QUESTIONS = 5;
  
  /**
   * Shuffle the array
   */
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

/**
 * Event listener for the start button
 */
if (Start) {
    Start.addEventListener('click', () => {
        window.location.href = "game.html";
    });
}
/**
 * Event listener for answer buttons
 */
answerButtons.forEach(button => {
    button.addEventListener('click', (e) => checkAnswer(e.currentTarget));
});

/**
 * Initialize the quiz
 */
if (window.location.pathname.includes("game.html")) {
    initQuiz();
};

/**
 * Initialize the quiz
 * Shuffle the questions and select a subset
 */
  function initQuiz() {
    selectedQuestions = shuffleArray(questions).slice(0, TOTAL_QUESTIONS);
    totalQuestionsElement.textContent = TOTAL_QUESTIONS;
    
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    
    answerButtons.forEach(button => {
        button.style.display = '';
        button.classList.remove(
            "bg-green-500", "border-green-400",
            "bg-red-500", "border-red-400",
            "opacity-70", "cursor-not-allowed"
        );
        button.disabled = false;
    });
    
    showQuestion(selectedQuestions[currentQuestionIndex]);
}

/**
 * Show the current question
 * Update the question text, progress bar, and answer buttons
 */
  function showQuestion(question) {
    answerButtons.forEach(button => {
        button.classList.remove(
            "bg-green-500", "border-green-400",
            "bg-red-500", "border-red-400",
            "opacity-70", "cursor-not-allowed"
        );
        button.disabled = false;
    });
  
    questionText.textContent = question.question;
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    
    const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
    progressBar.style.width = `${progress}%`;
    
    answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index];
    });
    
    feedbackElement.classList.add('hidden');
  }

  /**
   * check the answer
   * Compare the selected answer with the correct answer
   * Update the score and provide feedback 
   */
  function checkAnswer(selectedButton) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const selectedIndex = Array.from(answerButtons).indexOf(selectedButton);
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    answerButtons.forEach(button => {
        button.classList.remove(
            "bg-green-500", "border-green-400",
            "bg-red-500", "border-red-400",
            "opacity-70"
        );
    });

    answerButtons.forEach((button, index) => {
        button.disabled = true;
        
        if (index === currentQuestion.correctAnswer) {
            button.classList.add("bg-green-500", "border-green-400");
        } 
        else if (index === selectedIndex && !isCorrect) {
            button.classList.add("bg-red-500", "border-red-400");
        }
        else {
            button.classList.add("opacity-70");
        }
    });

    nextButton.classList.remove("hidden");

    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = isCorrect 
        ? currentQuestion.feedback.correct 
        : `${currentQuestion.feedback.incorrect} The correct answer was: ${currentQuestion.answers[currentQuestion.correctAnswer]}`;
    feedbackElement.className = isCorrect ? 'text-green-400' : 'text-red-400';
    feedbackElement.classList.remove('hidden');

    if (isCorrect) {
        score += 100;
        scoreElement.textContent = score;
    }

    setTimeout(() => {
        feedbackElement.classList.add('hidden');
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion(selectedQuestions[currentQuestionIndex]);
        } else {
            endQuiz();
        }
    }, 5000);
}

nextButton.addEventListener("click", () => {
  // Hide Next button
  nextButton.classList.add("hidden");
  
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
      showQuestion(selectedQuestions[currentQuestionIndex]);
  } else {
      endQuiz();
  }
});


/**
 * End the quiz and show final score
 */

function endQuiz() {
  questionText.textContent = `Quiz Complete! Your Score: ${score}/${TOTAL_QUESTIONS * 100}`;
  answerButtons.forEach(button => {
      button.style.display = 'none';
      button.classList.remove(
          "bg-green-500", "border-green-400",
          "bg-red-500", "border-red-400",
          "opacity-70", "cursor-not-allowed"
      );
      button.disabled = false;
  });
  
  if (!document.querySelector('.restart-button')) {
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Play Again';
      restartButton.className = 'restart-button mt-4 bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700';
      restartButton.addEventListener('click', () => {
          answerButtons.forEach(button => {
              button.style.display = '';
              button.classList.remove(
                  "bg-green-500", "border-green-400",
                  "bg-red-500", "border-red-400",
                  "opacity-70", "cursor-not-allowed"
              );
              button.disabled = false;
          });
          
          restartButton.remove();
          initQuiz();
      });
      questionText.insertAdjacentElement('afterend', restartButton);
  }
}

});

/**
 * Array of questions and answers
 */
const questions = [
  {
    question: "What is the main purpose of writing code?",
    answers: [
      "To make computers do tasks",
      "To confuse future developers",
      "To create visual art",
      "To crash your machine on purpose"
    ],
    correctAnswer: 0,
    feedback: {
      correct: "You nailed it! Even small wins like this chip away at imposter syndrome.",
      incorrect: "Oops, not quite — but here's the plot twist: making mistakes is the most human part of coding!"
    }
  },
  {
    question: "Which of these is a common beginner programming language?",
    answers: [
      "Python",
      "Klingon",
      "Morse Code",
      "Telepathy"
    ],
    correctAnswer: 0,
    feedback: {
      correct: "Boom! Proof that you know more than you think.",
      incorrect: "No worries! Even seasoned developers mix these up sometimes. Keep the curiosity going!"
    }
  },
  {
    question: "Which of the following is an error type in coding?",
    answers: [
      "Syntax Error",
      "Typo Attack",
      "Bugstorm",
      "Confusion Explosion"
    ],
    correctAnswer: 0,
    feedback: {
      correct: "Correct! Your brain's working like a real developer's — confusion included!",
      incorrect: "Not this one, but now you know: Syntax Errors haunt every coder's journey. You're in good company!"
    }
  },
  {
    question: "What does 'debugging' mean?",
    answers: [
      "Removing insects from your laptop",
      "Fixing errors in code",
      "Creating new errors",
      "Upgrading your coffee"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "That's the spirit — real coders celebrate each tiny 'aha!' moment.",
      incorrect: "Missed it? Debugging is a daily dance in coding — and sometimes the best lessons come from the hardest bugs."
    }
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "Happy Tech Makes Life",
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "High-Tech Machine Learning"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Right answer! Learning is all about stacking small victories like this.",
      incorrect: "Not quite! But now you know: HTML is the backbone of the web. Keep going!"
    }
  },
  {
    question: "Which of these symbols often ends a statement in JavaScript?",
    answers: [
      ". (full stop)",
      "! (exclamation mark)",
      "; (semicolon)",
      "@ (at symbol)"
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct! Semicolons are like the punctuation of programming.",
      incorrect: "Good guess! Semicolons might seem small, but they love making big errors when forgotten. Learning moment!"
    }
  },
  {
    question: "What is the best way to learn coding?",
    answers: [
      "Memorising everything like a robot",
      "Practice and making mistakes",
      "Staring at the code until it makes sense",
      "Avoiding it altogether"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Spot on! Practising, making mistakes and learning from them is the real path — not instant genius.",
      incorrect: "Trick question! Coding is all about trying, failing, and trying again. No one's born knowing this stuff."
    }
  },
  {
    question: "Who experiences imposter syndrome?",
    answers: [
      "Only beginners",
      "Only experts",
      "Everyone at some point",
      "Only robots"
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct — everyone does! From beginners to tech veterans. You're definitely not alone.",
      incorrect: "Nope! Everyone gets hit by imposter syndrome now and then, even people who seem super confident. It's human!"
    }
  },
  {
    question: "What is console.log() used for in JavaScript?",
    answers: [
      "Sending emails",
      "Logging messages to the console",
      "Locking your computer",
      "Printing real-world paper logs"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Right! Console.log() is the coder's way of whispering to the computer — and no, everyone forgets it sometimes!",
      incorrect: "Missed it? No worries! Every coder (yes, even the pros) fumbles with console.log now and then. Onward!"
    }
  },
  {
    question: "Which of the following is part of the web development trio?",
    answers: [
      "Python, Java, Ruby",
      "HTML, CSS, JavaScript",
      "Google, Stack Overflow, Luck",
      "Code, Coffee, Crying"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct! That trio is the bread and butter of the web world.",
      incorrect: "No biggie! HTML, CSS, and JavaScript are the three pillars of web magic. Now you know!"
    }
  },
  {
    question: "What is a 'bug' in programming?",
    answers: [
      "A cute insect",
      "A type of coffee",
      "A feature that doesn't work",
      "A coding language"
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Spot on! Bugs are like the gremlins of coding — they love to mess with your code.",
      incorrect: "Not quite! Bugs are the pesky little errors that pop up when you least expect them. Every coder's nightmare!"
    }
  },
  {
    question: "What is the purpose of CSS?",
    answers: [

      "To write server-side code",
      "To manage databases",
      "To create animations",
      "To add style to web pages",
    ],
    correctAnswer: 3,
    feedback: {
      correct: "Correct! CSS is all about making things look pretty on the web.",
      incorrect: "Not quite! CSS is the magic wand that makes web pages beautiful. Keep learning!"
    }
  },
  {
    question: "What does API stand for?",
    answers: [

      "All-Purpose Internet",
      "Application Programming Interface",
      "Awesome Programming Idea",
      "Automatic Program Installation"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Right! APIs are like the secret sauce of web development.",
      incorrect: "Not this one! APIs are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a version control system?",
    answers: [
      "To keep track of changes in code",
      "To control the speed of your computer",
      "To manage your social media",
      "To create new programming languages"
    ],
    correctAnswer: 0,
    feedback: {
      correct: "Correct! Version control is like a time machine for your code.",
      incorrect: "Not quite! Version control systems are the superheroes of coding, saving you from disaster. Keep going!"
    }
  },
  {
    question: "What is the purpose of a database?",
    answers: [

      "To create graphics",
      "To write code",
      "To design websites",
      "To store and manage data",
    ],
    correctAnswer: 3,
    feedback: {
      correct: "Spot on! Databases are the backbone of most applications.",
      incorrect: "Not this one! Databases are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a framework in programming?",
    answers: [
      "To create graphics",
      "To provide a structure for building applications",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct! Frameworks are like the scaffolding of coding.",
      incorrect: "Not quite! Frameworks are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a loop in programming?",
    answers: [
      "To repeat a block of code",
      "To create graphics",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 0,
    feedback: {
      correct: "Spot on! Loops are the bread and butter of coding.",
      incorrect: "Not this one! Loops are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a function in programming?",
    answers: [
      "To create graphics",
      "To write code",
      "To group related code together",
      "To design websites"
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct! Functions are the building blocks of coding.",
      incorrect: "Not quite! Functions are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a variable in programming?",
    answers: [
      "To create graphics",
      "To write code",
      "To design websites",
      "To store data",
    ],
    correctAnswer: 3,
    feedback: {
      correct: "Spot on! Variables are the bread and butter of coding.",
      incorrect: "Not this one! Variables are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a conditional statement in programming?",
    answers: [
      "To create graphics",
      "To write code",
      "To make decisions based on conditions",
      "To design websites"
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct! Conditional statements are the decision-makers of coding.",
      incorrect: "Not quite! Conditional statements are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a comment in programming?",
    answers: [
      "To explain code",
      "To create graphics",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 0,
    feedback: {
      correct: "Spot on! Comments are the unsung heroes of coding.",
      incorrect: "Not this one! Comments are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a library in programming?",
    answers: [
      "To create graphics",
      "To provide pre-written code for reuse",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct! Libraries are the toolbox of coding.",
      incorrect: "Not quite! Libraries are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a class in programming?",
    answers: [
      "To create graphics",
      "To write code",
      "To define a blueprint for objects",
      "To design websites"
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Spot on! Classes are the blueprints of coding.",
      incorrect: "Not this one! Classes are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of an object in programming?",
    answers: [
      "To create graphics",
      "To write code",
      "To design websites",
      "To represent a real-world entity",
    ],
    correctAnswer: 3,
    feedback: {
      correct: "Correct! Objects are the real-world representations of coding.",
      incorrect: "Not quite! Objects are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of an array in programming?",
    answers: [
      "To create graphics",
      "To store multiple values in a single variable",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Spot on! Arrays are the storage units of coding.",
      incorrect: "Not this one! Arrays are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a string in programming?",
    answers: [
      "To create graphics",
      "To write code",
      "To represent text data",
      "To design websites"
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct! Strings are the text data of coding.",
      incorrect: "Not quite! Strings are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a number in programming?",
    answers: [
      "To represent numeric data",
      "To create graphics",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 0,
    feedback: {
      correct: "Spot on! Numbers are the numeric data of coding.",
      incorrect: "Not this one! Numbers are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a boolean in programming?",
    answers: [
      "To create graphics",
      "To write code",
      "To design websites",
      "To represent true or false values",
    ],
    correctAnswer: 3,
    feedback: {
      correct: "Correct! Booleans are the true/false values of coding.",
      incorrect: "Not quite! Booleans are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a null value in programming?",
    answers: [
      "To create graphics",
      "To represent no value",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Spot on! Null values are the empty spaces of coding.",
      incorrect: "Not this one! Null values are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of an undefined value in programming?",
    answers: [
      "To represent a variable that has not been assigned a value",
      "To create graphics",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 0,
    feedback: {
      correct: "Correct! Undefined values are the mysteries of coding.",
      incorrect: "Not quite! Undefined values are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of a promise in programming?",
    answers: [
      "To create graphics",
      "To represent a value that may not be available yet",
      "To write code",
      "To design websites"
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Spot on! Promises are the future values of coding.",
      incorrect: "Not this one! Promises are the unsung heroes of coding. Keep digging!"
    }
  },
  {
    question: "What is the purpose of an event in programming?",
    answers: [
      "To create graphics",
      "To write code",
      "To represent a user action",
      "To design websites"
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct! Events are the user actions of coding.",
      incorrect: "Not quite! Events are the unsung heroes of coding. Keep digging!"
    }
  },
]
