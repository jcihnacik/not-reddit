// Requirements
const db = require("../models");

// Routes
module.exports = function(app) {
  // This route will search the DB and find all writers
  app.get("/api/users", function(req, res) {
<<<<<<< HEAD
    db.Users.findAll({
      include: [db.User]
=======
    db.User.findAll({
      include: [db.Post]
>>>>>>> 9b03c5f2144029b20167a7513221451e30196bed
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // This route will search for one writer chosen by the user
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
