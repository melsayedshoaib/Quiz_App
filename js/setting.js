import { Quiz } from "./quiz.js";

export class Setting {
  constructor() {
    this.categoryElement = document.getElementById("category");
    this.difficultyElements = document.getElementsByName("difficulty");
    this.numberOfQuestionsElement =
      document.getElementById("numberOfQuestions");
    document
      .getElementById("startBtn")
      .addEventListener("click", this.startQuiz.bind(this));
  }
  async startQuiz() {
    let category = this.categoryElement.value;
    let difficulty = Array.from(this.difficultyElements).filter((el) => {
      return el.checked;
    })[0].value;
    let numberOfQuestions = this.numberOfQuestionsElement.value;
    if (numberOfQuestions === "") {
      $("#alert1").fadeIn(500).fadeOut(500);
    } else if (numberOfQuestions == 0) {
      $("#alert1").fadeIn(500).fadeOut(500);
    } else {
      let api = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;
      let questions = await this.fetchApi(api);
      if (questions.length > 0) {
        $("#setting").fadeOut(500, function () {
          $("#quiz").fadeIn(500);
        });
        let quiz = new Quiz(questions);
      }
    }
  }
  async fetchApi(api) {
    let response = await fetch(api);
    response = await response.json();
    return response.results;
  }
}
