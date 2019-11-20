// Requirements
const db = require("../models");

// Routes
module.exports = function(app){

// This route will search the DB and find all writers
app.get("/api/users", function(req, res){
    db.Users.findAll({
        include: [db.Post]
    }).then(function(dbUser){
        res.json(dbUser);
    });
});

// This route will search for one writer chosen by the user
app.get("/api/writers/:id", function (req, res){
    db.Users.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Post]
    }).then(function(dbUser){
        res.json(dbUser);
    });
});











}
