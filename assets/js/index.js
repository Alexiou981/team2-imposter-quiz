document.addEventListener("DOMContentLoaded", () => {
    const Start = document.querySelector(".play-quiz-btn");
    const answerButtons = document.querySelectorAll(".answer-btn");
    const questionText = document.getElementById("question-text");
    const scoreElement = document.getElementById("score");
    const progressBar = document.getElementById("progress-bar");
    const currentQuestionElement = document.getElementById("current-question");
    const totalQuestionsElement = document.getElementById("total-questions");
  
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedQuestions = [];
    const TOTAL_QUESTIONS = 5;
  
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
  ];