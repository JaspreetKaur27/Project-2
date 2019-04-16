var db = require("../models");

var bcrypt = require("bcrypt");

module.exports = function (app) {

  app.get("/api/users/:username", function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/users", function (req, res) {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        res.json("bcrypt failed");
      } else {
        db.User.create({
          username: req.body.username,
          password: hash
        }).then(function (dbUser) {
          res.json(dbUser);
        });
      }
    });
  });

 
  app.post("/api/scores", function (req, res) {

    var {totalScore} = req.body;
    console.log(totalScore);

    db.Score.create({
       scores: totalScore,
       UserId:[db.User]
    }).then(function (scores){
      res.json(scores);
    }).catch((err) => {
      console.log(err);
    })


    // db.Example.findAll({}).then(function (dbExamples) {

    //   res.json(dbExamples);
    // });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
