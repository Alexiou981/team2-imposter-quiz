document.addEventListener("DOMContentLoaded", () => {
    const Start = document.querySelector(".play-quiz-btn");
    const answerButtons = document.querySelectorAll(".answer-btn");
    const questionText = document.getElementById("question-text");
    const scoreElement = document.getElementById("score");
    const progressBar = document.getElementById("progress-bar");
    const currentQuestionElement = document.getElementById("current-question");
    const totalQuestionsElement = document.getElementById("total-questions");
    const feedbackElement = document.getElementById("feedback");

    // Quiz State
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedQuestions = [];
    const TOTAL_QUESTIONS = 5;

    /**
     * Initialize the quiz
     * Shuffle questions and select a subset
     */
    function initQuiz() {
        selectedQuestions = shuffleArray(questions).slice(0, TOTAL_QUESTIONS);
        totalQuestionsElement.textContent = TOTAL_QUESTIONS;
        
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = score;
        
        showQuestion(selectedQuestions[currentQuestionIndex]);
    }

    /**
     * Display the current question and answers
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
     * Display current question and check the answer
     * Display feedback based on the answer
     * Update score and progress bar
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
        }, 2000);
    }

    /**
     * End the quiz and display the final score
     * Show a button to restart the quiz
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
        
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Play Again';
        restartButton.className = 'mt-4 bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700';
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
    /**
     * Shuffle an array
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
     * Event listeners for answer buttons
     */
    answerButtons.forEach(button => {
        button.addEventListener('click', (e) => checkAnswer(e.currentTarget));
    });

    /**
     * Check if the current page is game.html
     * If so, initialize the quiz
     */
    if (window.location.pathname.includes("game.html")) {
        initQuiz();
    }
});
  
  /**
   * Array of questions and answers
   */
  const questions = [
    {
      question: "What is the main purpose of writing code?",
      answers: [
        "To crash your machine on purpose",
        "To confuse future developers",
        "To create visual art",
        "To make computers do tasks"
      ],
      correctAnswer: 3,
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
        "Burgstorm Attack",
        "Typo Attack",
        "Syntax Error",
        "Confusion Explosion"
      ],
      correctAnswer: 2,
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
        "A computer virus",
        "A type of software",
        "A coding language",
        "A feature that doesn't work"
      ],
      correctAnswer: 3,
      feedback: {
        correct: "Spot on! Bugs are like the gremlins of coding — they love to mess things up.",
        incorrect: "Not quite! Bugs are the pesky little gremlins of coding. Every coder faces them, even the pros!"
      }
    },
    {
      question: "What is the purpose of CSS?",
      answers: [
        "To create databases",
        "To add style to web pages",
        "To write server-side code",
        "To manage user accounts"
      ],
      correctAnswer: 1,
      feedback: {
        correct: "Correct! CSS is all about making things look pretty on the web.",
        incorrect: "Not quite! CSS is the magic wand that makes web pages look good. Keep learning!"
      }
    },
    {
      question: "What is the purpose of a version control system?",
      answers: [
        "To create databases",
        "To manage user accounts",
        "To track changes in code",
        "To design user interfaces"
      ],
      correctAnswer: 2,
      feedback: {
        correct: "Correct! Version control is like a time machine for your code.",
        incorrect: "Not quite! Version control systems are like time machines for your code. Keep going!"
      }
    },
    {
      question: "What is the purpose of a database?",
      answers: [
        "To create web pages",
        "To store and manage data",
        "To write server-side code",
        "To design user interfaces"
      ],
      correctAnswer: 1,
      feedback: {
        correct: "Correct! Databases are like filing cabinets for your data.",
        incorrect: "Not quite! Databases are the filing cabinets of the digital world. Keep learning!"
      }
    },
    {
      question: "What is the purpose of a web server?",
      answers: [
        "To create databases",
        "To write server-side code",
        "To host websites and serve content",
        "To design user interfaces"
      ],
      correctAnswer: 2,
      feedback: {
        correct: "Correct! Web servers are like the delivery trucks of the internet.",
        incorrect: "Not quite! Web servers are the delivery trucks of the internet. Keep going!"
      }
    },
    {
      question: "What is the purpose of an API?",
      answers: [
        "To allow different software to communicate",
        "To create databases",
        "To write server-side code",
        "To design user interfaces"
      ],
      correctAnswer: 0,
      feedback: {
        correct: "Correct! APIs are like the translators between different software.",
        incorrect: "Not quite! APIs are the translators of the software world. Keep learning!"
      }
    },
    {
      question: "What is the purpose of a framework?",
      answers: [
        "To create databases",
        "To write server-side code",
        "To design user interfaces",
        "To provide a structure for building applications",
      ],
      correctAnswer: 3,
      feedback: {
        correct: "Correct! Frameworks are like the blueprints for building applications.",
        incorrect: "Not quite! Frameworks are the blueprints of the coding world. Keep going!"
      }
    },
    {
      question: "What is the purpose of a library?",
      answers: [
        "To create databases",
        "To provide pre-written code for reuse",
        "To write server-side code",
        "To design user interfaces"
      ],
      correctAnswer: 1,
      feedback: {
        correct: "Correct! Libraries are like toolkits for developers.",
        incorrect: "Not quite! Libraries are the toolkits of the coding world. Keep learning!"
      }
    },
    {
      question: "What is the purpose of a programming language?",
      answers: [
        "To create databases",
        "To write server-side code",
        "To communicate with computers",
        "To design user interfaces"
      ],
      correctAnswer: 2,
      feedback: {
        correct: "Correct! Programming languages are the languages we use to talk to computers.",
        incorrect: "Not quite! Programming languages are how we talk to computers. Keep going!"
      }
    },
    {
      question: "What is the purpose of a code editor?",
      answers: [
        "To create databases",
        "To write server-side code",
        "To design user interfaces",
        "To write and edit code",
      ],
      correctAnswer: 3,
      feedback: {
        correct: "Correct! Code editors are like the word processors of coding.",
        incorrect: "Not quite! Code editors are the word processors of the coding world. Keep learning!"
      }
    },
    {
        question: "When do professional coders stop learning?",
        answers: [
          "After 6 months",
          "Never - the tech world always changes",
          "Once they write their first 'Hello World' program",
          "On Weekends only",
        ],
        correctAnswer: 1,
        feedback: {
          correct: "Correct! Tech never sits still, and neither do curious minds.",
          incorrect: "Wrong, but revealing — even senior devs learn new things constantly."
        }
      },
  ];