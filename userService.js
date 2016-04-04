module.exports = function (sequelize) {
    var model = require("./model")(sequelize);
    var User = model.User;
    return {
        createUser : function(req, res) {
          console.log("Data: ", req.body);
          console.log("Username: ", req.body.username);
          console.log("Password:", req.body.password);
          var newUser = {
            username: req.body.username,
            password: req.body.password
          }
          User.create(newUser).then(function() {
            res.send(200);
          })
        },
        getUsers: function(req, res) {
          User.findAll().then(function(users) {
            res.send(users);
          })
        }
    };
};
