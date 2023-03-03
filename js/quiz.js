export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.score = 0;
    this.numberOfQuestions = this.questions.length;
    this.showQuestions();
    document
      .getElementById("next")
      .addEventListener("click", this.nextQuestion.bind(this));
    document.getElementById("tryBtn").addEventListener("click", () => {
      $("#finish").fadeOut(500, function () {
        $("#setting").fadeIn(500);
      });
      $("#numberOfQuestions").val("");
    });
  }
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  showQuestions() {
    document.getElementById("currentQuestion").innerHTML =
      this.currentQuestion + 1;
    document.getElementById("totalNumberOfQuestions").innerHTML =
      this.numberOfQuestions;
    let correctAnswer = this.questions[this.currentQuestion].correct_answer;
    let incorrectAnswer =
      this.questions[this.currentQuestion].incorrect_answers;
    let answers = [correctAnswer, ...incorrectAnswer];
    this.shuffle(answers);
    document.getElementById("question").innerHTML =
      this.questions[this.currentQuestion].question;
    let container = ``;
    for (let i = 0; i < answers.length; i++) {
      container += `<label class="form-check-label">
            <input type="radio" name="answer"  class="form-check-input" value="${answers[i]}">
            ${answers[i]}
        </label> <br>`;
    }
    document.getElementById("rowAnswer").innerHTML = container;
  }
  nextQuestion() {
    if (
      Array.from(document.getElementsByName("answer")).filter((el) => {
        return el.checked;
      }).length > 0
    ) {
      let correctAnswer = this.questions[this.currentQuestion].correct_answer;
      let userAnswer = Array.from(document.getElementsByName("answer")).filter(
        (el) => {
          return el.checked;
        }
      )[0].value;
      this.checkAnswer(userAnswer, correctAnswer);
      this.currentQuestion++;
      if (this.currentQuestion < this.numberOfQuestions) {
        this.showQuestions();
      } else {
        $("#quiz").fadeOut(500, function () {
          $("#finish").fadeIn(500);
        });
        document.getElementById("score").innerHTML = this.score;
      }
    } else {
      $("#alert").fadeIn(500).fadeOut(500);
    }
  }
  checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer == correctAnswer) {
      this.score++;
      $("#correct").fadeIn(500).fadeOut(500);
    } else {
      $("#inCorrect").fadeIn(500).fadeOut(500);
    }
  }
}
