document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correctAnswer: "Paris"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "Stephen King", "J.K. Rowling"],
            correctAnswer: "Harper Lee"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: "Leonardo da Vinci"
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "NaCl", "O2"],
            correctAnswer: "H2O"
        }
    ];

    const quizForm = document.getElementById('quiz-form');
    const questionsList = document.getElementById('questions-list');
    const scoreDisplay = document.getElementById('score');

    // Load questions
    function loadQuestions() {
        questions.forEach((question, index) => {
            const questionItem = document.createElement('li');
            questionItem.innerHTML = `
                <h3>${question.question}</h3>
                <ul>
                    ${question.options.map(option => `<li><input type="radio" name="question${index}" value="${option}">${option}</li>`).join('')}
                </ul>
            `;
            questions.appendChild(questionItem);
        });
    }

    // Check answers and calculate score
    function calculateScore() {
        let score = 0;
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === question.correctAnswer) {
                score++;
            }
        });
        return score;
    }

    // Load saved progress
    function loadProgress() {
        questions.forEach((question, index) => {
            const selectedOption = sessionStorage.getItem(`question${index}`);
            if (selectedOption) {
                document.querySelector(`input[name="question${index}"][value="${selectedOption}"]`).checked = true;
            }
        });
    }

    // Save progress to session storage
    function saveProgress() {
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                sessionStorage.setItem(`question${index}`, selectedOption.value);
            }
        });
    }

    // Handle form submission
    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        saveProgress();
        const score = calculateScore();
        scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
        localStorage.setItem('score', score);
    });

    // Initialize quiz
    loadQuestions();
    loadProgress();
});