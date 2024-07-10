
let QuizOptions = document.getElementById("QuizOptions")
let Questions = document.querySelector(".Questions .container .row")
let categoryMenu = document.getElementById("categoryMenu")
let difficultyOption = document.getElementById("difficultyOption")
let QuestionsNumber = document.getElementById("QuestionsNumber")
let startQuiz = document.getElementById("startQuiz")
let AllQuestion;
let quiz;

// fetch Alert divs
var QuestionsNumberAlert = document.getElementById("QuestionsNumberAlert")
var difficultyOptionAlert = document.getElementById("difficultyOptionAlert")
var categoryMenuAlert = document.getElementById("categoryMenuAlert")


startQuiz.addEventListener("click", async function () {

    validFormData()
    if (isDataValid()) {
        let category = categoryMenu.value
        let difficulty = difficultyOption.value
        let numbers = QuestionsNumber.value
        quiz = new Quiz(category, difficulty, numbers)
        AllQuestion = await quiz.getAllQuestions()
        let questions = new Question(0)
        QuizOptions.classList.add("d-none")
        questions.display()
    }
  
})
class Quiz {
    constructor(category, difficulty, numbers) {
        this.category = category;
        this.difficulty = difficulty;
        this.numbers = numbers;
        this.score = 0;
    }
    getApi() {
        return `https://opentdb.com/api.php?amount=${this.numbers}&category=${this.category}&difficulty=${this.difficulty}`
    }

    async getAllQuestions() {
        let response = await fetch(this.getApi())
        let data = await response.json();
        return data.results
    }

    showResult() {
        return `  <div class="question shadow-lg col-lg-12 p-4 rounded-3 d-flex flex-column justify-content-center">
      <h2 class="mb-">
      <i class="fa-solid fa-face-smile-wink"></i>
        ${this.score == this.numbers ? `Congratulations ` : `Your score is ${this.score}`}
      </h2>
      <button class="again btn btn-primary rounded-pill">Start Again</button>
    </div>`
    }
}
class Question {
    constructor(index) {
        this.index = index
        this.category = AllQuestion[index].category;
        this.correctAnswer = AllQuestion[index].correct_answer;
        this.question = AllQuestion[index].question;
        this.incorrectAnswer = AllQuestion[index].incorrect_answers;
        this.AllAnswers = this.getAllAnswers();
        this.isAnswered = false
    }

    getAllAnswers() {

        let allAnswers = [...this.incorrectAnswer, this.correctAnswer]
        allAnswers.sort()
        return allAnswers
    }
    display() {
        const questionMarkUp = `  <div class="question shadow-lg col-lg-12   p-3 rounded-3 d-flex flex-column justify-content-between">
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${AllQuestion.length} Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>
      <ul class="choices w-100 list-unstyled mb-0 d-flex flex-wrap text-center">
        ${this.AllAnswers.map((answer) => `<li class="btn btn-outline-Move" style="margin:5px; width: 45%;">${answer}</li>`).join(" ")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold">
        <i></i>Score : ${quiz.score}
      </h2>
    </div>`

        Questions.innerHTML = questionMarkUp;
        let AllChoices = document.querySelectorAll(".choices li")
        AllChoices.forEach(choice => {
            choice.addEventListener("click", (e) => {
                this.checkAnswer(choice)
                this.getNextQuestion()
            })
        });
    }

    checkAnswer(choice) {
        if (!this.isAnswered) {
            this.isAnswered = true
            if (choice.innerHTML == this.correctAnswer) {
                quiz.score++
                choice.classList.add("correct", "animate__animated", "animate__pulse")
            }
            else {
                choice.classList.add("wrong", "animate__animated", "animate__shakex")
            }
        }

    }

    getNextQuestion() {
        this.index++
        setTimeout(() => {
            if (this.index < AllQuestion.length) {
                let nextQuestion = new Question(this.index)
                nextQuestion.display()
            }
            else {
                let result = quiz.showResult()
                Questions.innerHTML = result;
                document.querySelector(".again").addEventListener("click", function () {
                    window.location.reload()
                })
            }
        }, 1000);
    }
}
// AllForm Valid when click button Start_Quiz and After Fetch Api
function isDataValid() {
    return /^(?!\s*$).+/.test(categoryMenu.value) &&
        /^(?!\s*$).+/.test(difficultyOption.value) &&
        /^(1[0-9]|20|[1-9])$/.test(QuestionsNumber.value);
}
// AllForm Valid when click button Start_Quiz
function validFormData() {
    if (/^(1[0-9]|20|[1-9])$/.test(QuestionsNumber.value)) {
        QuestionsNumberAlert.classList.add("d-none")
        QuestionsNumber.classList.add("is-valid")
        QuestionsNumber.classList.remove("is-invalid")
    }
    else {
        QuestionsNumberAlert.classList.remove("d-none")
        QuestionsNumber.classList.remove("is-valid")
        QuestionsNumber.classList.add("is-invalid")

    }


    if (/^(?!\s*$).+/.test(difficultyOption.value)) {
        difficultyOptionAlert.classList.add("d-none")
        difficultyOption.classList.add("is-valid")
        difficultyOption.classList.remove("is-invalid")
    }
    else {
        difficultyOptionAlert.classList.remove("d-none")
        difficultyOption.classList.remove("is-valid")
        difficultyOption.classList.add("is-invalid")

    }


    if (/^(?!\s*$).+/.test(categoryMenu.value)) {
        categoryMenuAlert.classList.add("d-none")
        categoryMenu.classList.add("is-valid")
        categoryMenu.classList.remove("is-invalid")
    }
    else {
        categoryMenuAlert.classList.remove("d-none")
        categoryMenu.classList.remove("is-valid")
        categoryMenu.classList.add("is-invalid")

    }


}
// QuestionsNumber Valid
QuestionsNumber.addEventListener("keyup", () => {
    validQuestionsNumber()
})
// difficultyOption Valid
difficultyOption.addEventListener("change", () => {
    validDifficultyOption()
})
// CategoryMenu Valid
categoryMenu.addEventListener("change", () => {
    validCategoryMenu()
})

function validQuestionsNumber() {
    if (/^(1[0-9]|20|[1-9])$/.test(QuestionsNumber.value)) {
        QuestionsNumberAlert.classList.add("d-none")
        QuestionsNumber.classList.add("is-valid")
        QuestionsNumber.classList.remove("is-invalid")
    }
    else {
        QuestionsNumberAlert.classList.remove("d-none")
        QuestionsNumber.classList.remove("is-valid")
        QuestionsNumber.classList.add("is-invalid")
    }
}
function validDifficultyOption() {
    if (/^(?!\s*$).+/.test(difficultyOption.value)) {
        difficultyOptionAlert.classList.add("d-none")
        difficultyOption.classList.add("is-valid")
        difficultyOption.classList.remove("is-invalid")
    }
    else {
        difficultyOptionAlert.classList.remove("d-none")
        difficultyOption.classList.remove("is-valid")
        difficultyOption.classList.add("is-invalid")
    }
}
function validCategoryMenu() {
    if (/^(?!\s*$).+/.test(categoryMenu.value)) {
        categoryMenuAlert.classList.add("d-none")
        categoryMenu.classList.add("is-valid")
        categoryMenu.classList.remove("is-invalid")
    }
    else {
        categoryMenuAlert.classList.remove("d-none")
        categoryMenu.classList.remove("is-valid")
        categoryMenu.classList.add("is-invalid")
    }
}