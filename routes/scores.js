// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/all-scores/:score_id", function (req, res) {
        var query = {};
        if (req.params.score_id) {
            query.UserId = req.params.score_id;
        }
        console.log(query);
        // 1. Add a join here to include all of the Authors to these posts
        db.Score.findAll({
            where: query,
            include: [db.User]
        }).then(function (dbScore) {
            res.json(dbScore);
            console.log(dbScore);
        });
    });

 
};
