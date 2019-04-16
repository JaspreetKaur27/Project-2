var db = require("../models");
var rp = require("request-promise");
var _ = require('underscore');
var path = require("path");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();




//**************************************************** API CALL *********************************************************



//**************************************************** MARTIN CODE *********************************************************

module.exports = function (app) {
  // Load index page

  app.get("/trivia", function (req, res) {
    var newTrivia;
    Array.prototype.shuffle = function () {
      var i = this.length, j, temp;
      if (i == 0) return this;
      while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }
      return this;
    }

    rp("https://opentdb.com/api.php?amount=100&category=18")
      .then(function (body) {

        var data = JSON.parse(body);
        var myTrivia = data.results;
        var filteredTrivia = _.where(myTrivia, { type: "multiple" });

        // console.log(filteredTrivia);
        newTrivia = filteredTrivia.map(trivia => ({
          question: entities.decode(trivia.question),
          options: [
            entities.decode(trivia.incorrect_answers[0]),
            entities.decode(trivia.incorrect_answers[1]),
            entities.decode(trivia.incorrect_answers[2]),
            entities.decode(trivia.correct_answer),
          ].shuffle(),
          correctAnswer: entities.decode(trivia.correct_answer),
          difficulty: trivia.difficulty,
          type: trivia.type
        }));
        // console.log(newTrivia);

      }).then(() => {

        res.render("trivia", {
          trivia: newTrivia

        });
        console.log('Data retrieved')

      }).catch((err) => {

        console.log(err);

      })


  });

  app.get("/", function (req, res) {

    res.render(path.join(__dirname, "../views/index.handlebars"));


  })

  // Load example page and pass in an example by id
  app.get("/scores", function (req, res) {

    res.render(path.join(__dirname, "../views/scores.handlebars"));
  });

  app.get("/about",function(req, res) {
    res.render(path.join(__dirname, "../views/about.handlebars"));
  });




  
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });





};

