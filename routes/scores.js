

const db = require("../models");

module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/all-scores/:userId?", function (req, res) {
        var query = {};
        if (req.params.userId) {
            query.UserId = req.params.userId;
        }
        console.log(query);
        // 1. Add a join here to include all of the players to these scores
        db.Score.findAll({
            limit: 10,
            where: query,
            include: [db.User],
            order: [
                ['scores', 'DESC'],
                ['updatedAt', 'DESC']
                ]
        }).then(function (dbScore) {
            // res.json(dbScore);
            console.log(dbScore);
            res.render('scoreboard', {scores:dbScore})
            
        }).catch(err => {
            console.log(err);
        })
    });


    app.post("/api/scores", function (req, res) {

        console.log(req.body);
        var { totalScore, UserId, username } = req.body;
        console.log(totalScore);

        db.Score.create({
            scores: totalScore,
            UserId: UserId
        }).then(function (data) {
            res.redirect('api/all-scores');
        }).catch((err) => {
            console.log(err);
        })
    });


    app.post("/api/delete-score/:id", function (req, res) {
        console.log('reached route' + req.params.id);

        db.Score.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            console.log("delete" + dbExample);
            // res.json(dbExample);
            res.status(200).json(dbExample);
        });
    });
};

