let score = 0;
let currentExpression = {};
generateQuestion();

function generateQuestion() {
    let level = parseInt(document.getElementById("level").value);
    let a = getRandomNonZero(-20, 20);
    let b = getRandomNonZero(-20, 20);
    let c = getRandomNumber(-10, 10);
    let d = getRandomNumber(-10, 10);
    let x = getRandomNumber(-10, 10);
    let y = getRandomNumber(-10, 10); // Used only in Level 7
    let expression = "";
    let correctAnswer = 0;

    if (level === 1) {
        expression = `${a}x + ${b}`;
        correctAnswer = a * x + b;
    } else if (level === 2) {
        expression = `${a}x + ${b}x + ${c}`;
        correctAnswer = a * x + b * x + c;
    } else if (level === 3) {
        expression = `${a}x² + ${b}x + ${c}`;
        correctAnswer = a * x * x + b * x + c;
    } else if (level === 4) {
        expression = `${a}x² + ${b}x + ${c}`;
        correctAnswer = a * x * x + b * x + c;
    } else if (level === 5) {
        expression = `${a}x³ + ${b}x² + ${c}x + ${d}`;
        correctAnswer = a * x * x * x + b * x * x + c * x + d;
    } else if (level === 6) {
        expression = `${a}x³ + ${b}x² + ${c}x + ${d}`;
        correctAnswer = a * x * x * x + b * x * x + c * x + d;
    } else if (level === 7) {
        expression = `${a}x + ${b}y + ${c}`;
        correctAnswer = a * x + b * y + c;
    }

    currentExpression = { level, a, b, c, d, x, y, correctAnswer, expression };

    document.getElementById("question").innerText =
        `What is the value of ${expression} if x = ${x}${level === 7 ? `, y = ${y}` : ''}?`;

    resetSimilarProblem(); // Reset similar problem section
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer").value);

    if (!isNaN(userAnswer)) {
        if (userAnswer === currentExpression.correctAnswer) {
            score++; // ✅ Correct answer → Add 1 point
            document.getElementById("feedback").innerText = "✅ Correct! Score +1";
            document.getElementById("feedback").style.color = "green";
        } else {
            score--; // ❌ Incorrect answer → Subtract 1 point
            document.getElementById("feedback").innerText = "❌ Incorrect! Score -1";
            document.getElementById("feedback").style.color = "red";
        }
        document.getElementById("score").innerText = score;
        document.getElementById("answer").value = "";
        generateQuestion();
    } else {
        document.getElementById("feedback").innerText = "⚠️ Please enter a number!";
        document.getElementById("feedback").style.color = "orange";
    }
}

function showSimilarProblem() {
    let level = currentExpression.level;
    let a = getSameParity(currentExpression.a);
    let b = getSameParity(currentExpression.b);
    let c = getSameParity(currentExpression.c);
    let d = getSameParity(currentExpression.d);
    let x = getSameParity(currentExpression.x);
    let y = getSameParity(currentExpression.y);
    let expression = "";
    let correctAnswer = 0;

    if (level === 1) {
        expression = `${a}x + ${b}`;
        correctAnswer = a * x + b;
    } else if (level === 2) {
        expression = `${a}x + ${b}x + ${c}`;
        correctAnswer = a * x + b * x + c;
    } else if (level === 3) {
        expression = `${a}x² + ${b}x + ${c}`;
        correctAnswer = a * x * x + b * x + c;
    } else if (level === 4) {
        expression = `${a}x² + ${b}x + ${c}`;
        correctAnswer = a * x * x + b * x + c;
    } else if (level === 5) {
        expression = `${a}x³ + ${b}x² + ${c}x + ${d}`;
        correctAnswer = a * x * x * x + b * x * x + c * x + d;
    } else if (level === 6) {
        expression = `${a}x³ + ${b}x² + ${c}x + ${d}`;
        correctAnswer = a * x * x * x + b * x * x + c * x + d;
    } else if (level === 7) {
        expression = `${a}x + ${b}y + ${c}`;
        correctAnswer = a * x + b * y + c;
    }

    document.getElementById("similar-problem").innerText =
        `New Problem: What is the value of ${expression} if x = ${x}${level === 7 ? `, y = ${y}` : ''}?`;

    document.getElementById("solution-steps").innerHTML =
        `Step 1: Substitute x = ${x}${level === 7 ? ` and y = ${y}` : ''} into the equation → ${expression.replace('x', `(${x})`).replace('y', `(${y})`)} <br>
         Step 2: Compute the values step-by-step.<br>
         Step 3: Final result: <strong>${correctAnswer}</strong>`;

    document.getElementById("final-answer").innerHTML = `<strong>Answer: ${correctAnswer}</strong>`;

    document.getElementById("solution-box").style.display = "block";
}

function resetSimilarProblem() {
    document.getElementById("solution-box").style.display = "none";
    document.getElementById("similar-problem").innerText = "";
    document.getElementById("solution-steps").innerText = "";
    document.getElementById("final-answer").innerText = "";
}

// Utility functions
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNonZero(min, max) {
    let num;
    do {
        num = getRandomNumber(min, max);
    } while (num === 0);
    return num;
}

function getSameParity(original) {
    let num;
    do {
        num = getRandomNumber(-20, 20);
    } while ((num % 2 !== original % 2) || (num < 0 !== original < 0));
    return num;
}
