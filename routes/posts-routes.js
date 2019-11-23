var db = require("../models");

// Routes

// rout for getting all the post.
module.exports = function(app) {
  app.get("/api/posts", function(req, res) {
    // var query = {};
    // if (req.query.user_id) {
    //   query.UserId = req.query.user_id;
    // }
    db.Post.findAll({
    //   where: query,
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // route for retrieve a single post
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Post route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create({title:req.body.title,body:req.body.body}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
