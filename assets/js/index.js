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
     * Event listener for the Start button
     * When clicked, it redirects to the game.html page.
     */
    if (Start) {
      Start.addEventListener("click", () => {
        window.location.href = "game.html";
      });
    }
    /**
     * Event listener for the answer buttons
     * When clicked, it checks the answer and updates the score.
     */
    if (answerButtons.length > 0) {
      answerButtons.forEach((button) => {
        button.addEventListener("click", (e) => checkAnswer(e.target));
      });
    }
  
    /**
     * Function to initialize the quiz
     * It shuffles the questions, sets the score to 0, and displays the first question.
     */
    function initQuiz() {
      selectedQuestions = shuffleArray(questions).slice(0, TOTAL_QUESTIONS);
      totalQuestionsElement.textContent = TOTAL_QUESTIONS;
  
      currentQuestionIndex = 0;
      score = 0;
      scoreElement.textContent = score;
  
      // Show answer buttons
      answerButtons.forEach((button) => {
        button.style.display = "";
      });
  
      showQuestion(selectedQuestions[currentQuestionIndex]);
    }
  
    /**
     * Show the current question card
     */
  
    function showQuestion(question) {
      questionText.textContent = question.question;
      currentQuestionElement.textContent = currentQuestionIndex + 1;
  
      const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
      progressBar.style.width = `${progress}%`;
  
      answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index];
        button.dataset.correct = index === question.correctAnswer;
        button.classList.remove(
          "bg-green-500",
          "bg-red-500",
          "cursor-not-allowed"
        );
        button.disabled = false;
      });
    }
  
    /**
     * Check if selected answer is correct
     */
  
    function checkAnswer(selectedButton) {
      const isCorrect = selectedButton.dataset.correct === "true";
  
      answerButtons.forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
          button.classList.add("bg-green-500");
        } else {
          button.classList.add("bg-red-500");
        }
      });
  
      if (isCorrect) {
        score += 100;
        scoreElement.textContent = score;
      }
  
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < TOTAL_QUESTIONS) {
          showQuestion(selectedQuestions[currentQuestionIndex]);
        } else {
          endQuiz();
        }
      }, 1000);
    }
  
    /**
     * Function to end the quiz
     * It displays the final score and a button to restart the quiz.
     */
  
    function endQuiz() {
      questionText.textContent = `Quiz Complete! Your Score: ${score}/${
        TOTAL_QUESTIONS * 100
      }`;
      answerButtons.forEach((button) => (button.style.display = "none"));
  
      const restartButton = document.createElement("button");
      restartButton.textContent = "Play Again";
      restartButton.className =
        "mt-4 bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700";
      restartButton.addEventListener("click", () => {
        restartButton.style.display = "none";
        initQuiz();
      });
      questionText.insertAdjacentElement("afterend", restartButton);
    }
  
    function shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  
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
      question: "What is JavaScript primarily used for?",
      answers: [
        "Data analysis",
        "Server administration",
        "Adding interactivity to websites",
        "Video editing",
      ],
      correctAnswer: 2,
      wrongAnswer: [1, 0, 3],
    },
    {
      question: "Which of the following is not a JavaScript data type?",
      answers: ["Number", "String", "Boolean", "Float"],
      correctAnswer: 3,
      wrongAnswer: [0, 2, 1],
    },
    {
      question: "What does the 'DOM' stand for in JavaScript?",
      answers: [
        "Document Object Model",
        "Data Object Model",
        "Document Order Model",
        "Document of Manipulation",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question:
        "What is the correct way to define a variable in JavaScript with a global Scope?",
      answers: ["let", "const", "var", "int"],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question:
        "Which of the following JavaScript frameworks is used for building user interfaces?",
      answers: ["JQuery", "Mongoose", "Express", "React"],
      correctAnswer: 3,
      wrongAnswer: [1, 2, 0],
    },
    {
      question: "What is the purpose of the 'if' statement in JavaScript?",
      answers: [
        "Loop through an array",
        "Declare a function",
        "Make decisions in your code",
        "Create a class",
      ],
      correctAnswer: 2,
      wrongAnswer: [1, 0, 3],
    },
    {
      question:
        "What method is used to add a new element to the end of an array in JavaScript?",
      answers: ["append()", "push()", "insert()", "add()"],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question:
        "Which JavaScript function is used to perform an action after a specific time interval?",
      answers: ["setTimer()", "delay()", "setInterval()", "wait"],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: "What is the correct way to write a comment in JavaScript?",
      answers: [
        "//This is a comment",
        "<!--This is a comment-->",
        "++This is a comment++",
        "**This is a comment**",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "What is the purpose of the 'this' keyword in JavaScript?",
      answers: [
        "Refers to the previous function",
        "Refers to a specific HTML element",
        "Refers to the current object",
        "Refers to a global variable",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: "Who invented Javascript?",
      answers: [
        //Question 11
        "Brenden Elch",
        "Hakon Wium Lie",
        "Tim Berners-Lee",
        "Guido van Rossum",
      ],
      correctAnswer: 0,
      wrongAnswer: [2, 1, 3],
    },
    {
      question: "What does the getAttribute()?",
      answers: [
        //Question 12
        "Checks if element node has a specified attribute?",
        "sets the value of an attribute?",
        "gets the value of an attribute?",
        "removes an attribute from an element node?",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: "What is the basic difference between JavaScript and Java?",
      answers: [
        //Question 13
        "Functions are considered as fields",
        "Java is a compiled language and runs in a Java Virtual Machine, while JavaScript is an interpreted language and is used for creating interactive websites.",
        "Functions are values, and there is no hard distinction between methods and fields",
        "Variables are specific",
      ],
      correctAnswer: 1,
      wrongAnswer: [2, 0, 3],
    },
    {
      question: "Which of the following scoping type does JavaScript use??",
      answers: [
        //Question 14
        "Sequential",
        "Segmental",
        "Lexical",
        "Literal",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What is a closure in JavaScript?",
      answers: [
        //Question 15
        "A function that has access to its own scope, the outer function's scope, and the global scope",
        "A function that can be stored in a variable",
        "A function that cannot access variables from other functions",
        "A function that can only access its own variables",
      ],
      correctAnswer: 0,
      wrongAnswer: [2, 1, 3],
    },
    {
      question:
        "Which of the following is the property that is triggered in response to JS errors?",
      answers: [
        //Question 16
        "onclick",
        "onerror",
        "onmessage",
        "onexeption",
      ],
      correctAnswer: 1,
      wrongAnswer: [2, 1, 3],
    },
    {
      question: "Which of the following is not a framework?",
      answers: [
        //Question 17
        "JavaScript .NET",
        "JavaScript",
        "CocoaJS",
        "JQuery",
      ],
      correctAnswer: 1,
      wrongAnswer: [2, 1, 3],
    },
    {
      question: "What is the purpose of the 'this' keyword in JavaScript?",
      answers: [
        //Question 18
        "Refers to the previous function",
        "Refers to a specific HTML element",
        "Refers to the current object",
        "Refers to a global variable",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: "Why event handlers is needed in JS?",
      answers: [
        // Question 19
        "Allows JavaScript code to alter the behaviour of windows",
        "Adds innerHTML page to the code",
        "Change the server location",
        "Performs handling of exceptions and occurrences",
      ],
      correctAnswer: 0,
      wrongAnswer: [2, 1, 3],
    },
    {
      question:
        "What is the prototype represents in the following JavaScript code snippet?: function javascript() {}",
      answers: [
        // Question 20
        "Not valid",
        "Prototype of a function",
        "Function javascript",
        "A custom constructor",
      ],
      correctAnswer: 3,
      wrongAnswer: [0, 1, 2],
    },
    {
      question:
        "What will be the result or type of error if p is not defined in the following JavaScript code snippet?: console.log(p)",
      answers: [
        // Question 21
        "Value not found Error",
        "Reference Error",
        "Null",
        "Zero",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question:
        "Which of the following methods/operation does javascript use instead of == and !=?",
      answers: [
        // Question 22
        "JavaScript uses equalto()",
        "JavaScript uses equals() and notequals() instead",
        "JavaScript uses bitwise checking",
        "javaScriptuses === and !== instead",
      ],
      correctAnswer: 3,
      wrongAnswer: [0, 1, 2],
    },
    {
      question: "Why JavaScript Engine is needed?",
      answers: [
        //Question 23
        "Both Compiling & Interpreting the JavaScript",
        "Parsing the JavaScript",
        "Interpreting the JavaScript",
        "Compiling the JavaScript",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: "What is the purpose of the 'this' keyword in JavaScript?",
      answers: [
        // Question 24
        "Refers to the previous function",
        "Refers to a specific HTML element",
        "Refers to the current object",
        "Refers to a global variable",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: " What is the basic difference between JavaScript and Java?",
      answers: [
        //Question 25
        "Functions are considered as fields",
        "Functions are values, and there is no hard distinction between methods and fields",
        "Variables are specific",
        "There is no difference",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question:
        "Which of the following explains correctly what happens when a JavaScript program is developed on a Unix Machine?",
      answers: [
        //Question 26
        "will work perfectly well on a Windows Machine",
        "will be displayed as JavaScript text on the browser",
        "will throw errors and exceptions",
        "must be restricted to a Unix Machine only",
      ],
      correctAnswer: 0,
      wrongAnswer: [2, 1, 3],
    },
    {
      question:
        " Which of the following can be used to call a JavaScript Code Snippet?",
      answers: [
        //Question 27
        "Function/Method",
        "Preprocessor",
        "Triggering Event",
        "RMI",
      ],
      correctAnswer: 0,
      wrongAnswer: [2, 1, 3],
    },
    {
      question:
        "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
      answers: [
        //Question 28
        "Position",
        "Window",
        "Standard",
        "Location",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question:
        " Where is Client-side JavaScript code is embedded within HTML documents?",
      answers: [
        //Question 29
        "A URL that uses the special javascript: code",
        "A URL that uses the special javascript: protocol",
        "A URL that uses the special javascript: encoding",
        "A URL that uses the special javascript: stack",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question:
        "Arrays in JavaScript are defined by which of the following statements?",
      answers: [
        //Question 30
        "It is an ordered list of values",
        "It is an ordered list of objects",
        "It is an ordered list of string",
        "It is an ordered list of functions",
      ],
      correctAnswer: 0,
      wrongAnswer: [2, 1, 3],
    },
    {
      question:
        "Among the given statements, which statement defines closures in JavaScript?",
      answers: [
        //Question 31
        "JavaScript is a function that is enclosed with references to its inner function scope",
        "JavaScript is a function that is enclosed with references to its lexical environment",
        "JavaScript is a function that is enclosed with the object to its inner function scope",
        "None of the mentioned",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What does var stand for in JavaScript?",
      answers: [
        //Question 32
        "Variable",
        "Very large",
        "Varying",
        "Variable and not reassigned",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "What is the correct way to write a JavaScript array?",
      answers: [
        //Question 33
        'var colors = "red", "green", "blue";',
        'var colors = ["red", "green", "blue"];',
        'var colors = (1:"red", 2:"green", 3:"blue");',
        'var colors = {1:"red", 2:"green", 3:"blue"};',
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What is the correct way to write a JavaScript function?",
      answers: [
        //Question 34
        "function:myFunction()",
        "function = myFunction()",
        "function myFunction()",
        "function:myFunction",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: "How do you write a JavaScript for loop?",
      answers: [
        //Question 35
        "for (i = 0; i <= 5; i++)",
        "for i = 0 to 5",
        "for (i <= 5; i++)",
        "for i = 0 to 5",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "What does == do in JavaScript?",
      answers: [
        //Question 36
        "Assigns a value to a variable",
        "Compares two values",
        "Adds two values",
        "Subtracts two values",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "How do you write a JavaScript while loop?",
      answers: [
        //Question 37
        "while i = 0 to 5",
        "while (i <= 5; i++)",
        "while (i <= 5)",
        "while i = 0 to 5",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: 'What is the output of console.log(10 + 5 + "10");?',
      answers: [
        //Question 38
        "25",
        "2010",
        "2510",
        "35",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What does typeof do in JavaScript?",
      answers: [
        //Question 39
        "Returns the type of a variable",
        "Changes the type of a variable",
        "Deletes a variable",
        "Multiplies a variable by 2",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question:
        "Which one of the following also known as Conditional Expression:",
      answers: [
        //Question 40
        "Alternative to if-else",
        "Switch statement",
        "If-then-else statement",
        "immediate if",
      ],
      correctAnswer: 3,
      wrongAnswer: [0, 2, 1],
    },
    {
      question: "What is the main purpose of writing code?",
      answers: [
        //Question 41
        "To make computers do tasks",
        "To confuse future developers",
        "To create visual art",
        "To crash your machine on purpose",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
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
        //Question 42
        "Python",
        "Klingon",
        "Morse Code",
        "Telepathy",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
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
      
        //Question 43
        "Syntax Error",
        "Typo Attack",
        "Bugstorm",
        "Confusion Explosion",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
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

        //Question 44
        "Removing insects from your laptop",
        "Fixing errors in code",
        "Creating new errors",
        "Upgrading your coffee",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],

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
        //Question 45
        "Happy Tech Makes Life",
        "HyperText Markup Language",
        "Home Tool Markup Language",
        "High-Tech Machine Learning",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
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
        //Question 46
        ". (full stop)",
        "! (exclamation mark)",
        "; (semicolon)",
        "@ (at symbol)",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
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
        //Question 47
        "Memorising everything like a robot",
        "Practice and making mistakes",
        "Staring at the code until it makes sense",
        "Avoiding it altogether",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
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
        //Question 48
        "Only beginners",
        "Only experts",
        "Everyone at some point",
        "Only robots",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
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
        //Question 49
        "Sending emails",
        "Logging messages to the console",
        "Locking your computer",
        "Printing real-world paper logs",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
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
        //Question 50
        "Python, Java, Ruby",
        "HTML, CSS, JavaScript",
        "Google, Stack Overflow, Luck",
        "Code, Coffee, Crying",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What is Git mostly used for?",
      answers: [
        //Question 51
        "Drawing digital art",
        "Tracking changes in code",
        "Cooking recipes",
        "Translating languages",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What’s the best response when you get stuck on a coding problem?",
      answers: [
        //Question 52
        "Panic immediately",
        "Give up and start a new hobby",
        "Take a break or ask for help",
        "Throw your computer out the window",
      ],
      correctAnswer: 2,
      wrongAnswer: [0, 1, 3],
    },
    {
      question: "What is Python known for?",
      answers: [
        //Question 53
        "Being readable and beginner-friendly",
        "Being written only by wizards",
        "Making websites look pretty",
        "Being the oldest language in the world",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "In programming, what’s a 'loop'?",
      answers: [
        //Question 54
        "A ring-shaped snack",
        "A tool for repeating code",
        "A Wi-Fi password",
        "A type of bug",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What’s the most important skill for a coder?",
      answers: [
        //Question 55
        "Knowing all answers instantly",
        "Googling, problem-solving, and patience",
        "Memorising hundreds of commands",
        "Psychic predictions",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What does CSS do in web development?",
      answers: [
        //Question 56
        "Styles the appearance of a webpage",
        "Compresses images",
        "Builds the server",
        "Handles database queries",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "When do professional coders stop learning?",
      answers: [
        //Question 57
        "After 6 months",
        "Never — the tech world always changes",
        "Once they write their first 'Hello World'",
        "On weekends only",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What is a variable in coding?",
      answers: [
        //Question 58
        "A shape-shifting coffee cup",
        "A container for storing data",
        "A type of bug",
        "A keyboard shortcut",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What do developers use Stack Overflow for?",
      answers: [
        //Question 59
        "Buying snacks",
        "Sharing and finding coding solutions",
        "Reporting lost laptops",
        "Learning magic tricks",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "Which of these feelings is common when learning code?",
      answers: [
        //Question 60
        "Frustration",
        "Curiosity",
        "Imposter syndrome",
        "All of the above",
      ],
      correctAnswer: 3,
      wrongAnswer: [0, 1, 2],
    },
    {
      question: "Why is making mistakes valuable when coding?",
      answers: [
        //Question 61
        "It sharpens learning and problem-solving",
        "It makes you look busy",
        "It’s the only way to write code",
        "It guarantees instant success",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "What does the if statement do?",
      answers: [
        //Question 62
        "Makes decisions in code",
        "Starts a computer fight",
        "Prints text upside down",
        "Changes your password",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "Is it normal to feel lost when learning new programming concepts?",
      answers: [
        //Question 63
        "No, only the unmotivated feel lost",
        "Yes, it’s part of the learning curve",
        "Only on Mondays",
        "Never — knowledge is instant",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "Why do developers write comments in code?",
      answers: [
        //Question 64
        "To explain the code to others (and themselves)",
        "To increase word count",
        "To confuse future readers",
        "To hide secret messages",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "What is 'open-source' software?",
      answers: [
        //Question 65
        "Software anyone can view, use, and modify",
        "Software that self-destructs",
        "Software built by AI only",
        "Software that only works on Tuesdays",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    },
    {
      question: "What do you call the process of turning human-readable code into machine-readable code?",
      answers: [
        //Question 66
        "Baking",
        "Compiling",
        "Teleporting",
        "Copy-pasting",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What is the output of print('Hello, World!') in Python?",
      answers: [
        //Question 67
        "An email to your boss",
        "Hello, World! in the console",
        "A new website",
        "A secret message",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What is an array?",
      answers: [
        //Question 68
        "A type of raygun",
        "A collection of items stored in a single variable",
        "A pop-up message",
        "A kind of sandwich",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "Which of these is true about learning code?",
      answers: [
        //Question 69
        "You must understand everything before starting",
        "Mistakes are part of the process",
        "Only geniuses can learn to code",
        "You must code without coffee",
      ],
      correctAnswer: 1,
      wrongAnswer: [0, 2, 3],
    },
    {
      question: "What does return do in most programming languages?",
      answers: [
        //Question 70
        "Sends data back from a function",
        "Refunds your computer",
        "Prints a document",
        "Spins your chair",
      ],
      correctAnswer: 0,
      wrongAnswer: [1, 2, 3],
    }
  ];