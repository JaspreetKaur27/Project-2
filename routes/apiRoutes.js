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


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    console.log('reached route');
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      console.log(dbExample);
      res.json(dbExample)
      // res.redirect('/api/all-scores');
    });
  });
};
