module.exports = function (sequelize) {
    var model = require("./model")(sequelize);
    var config = require("./config");
    var jwt = require("jsonwebtoken");
    var User = model.User;
    return {
        createUser : function(req, res) {
          var newUser = {
            username: req.body.username,
            password: req.body.password
          }
          User.create(newUser).then(function() {
            res.send(200);
          })
        },
        getUsers: function(req, res) {
          var token = req.body.token || req.query.token || req.headers['x-access-token'];
          if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
              if(err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
              } else {
                User.findAll().then(function(users) {
                  res.send(users);
                });
              }
            });
          } else {
            return res.json({ success: false, message: 'No token provided' });
          }
        }
    };
};
