var db = require("../models");

module.exports = function(app){
app.post("/squeeker", function(req, res) {
  db.Squeek.create(req.body).then(function(dbSqueek) {
    res.json(dbSqueek);
  });
});

app.get("/squeeker", function(req, res) {
  var query = {};
  if (req.query.user_id) {
    query.UserId = req.query.user_id;
  }
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  db.Squeek.findAll({
    where: query,
    include: [db.User]
  }).then(function(dbSqueek) {
    res.json(dbSqueek);
  });
});
}