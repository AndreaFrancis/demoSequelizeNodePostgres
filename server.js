var app = require("express")();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var config = require("./config");
var Sequelize = require("sequelize");
var connectionString = config.dialect+"://"+config.user+":"+config.password+"@"+config.server+":"+config.port+"/"+config.db;
var sequelize = new Sequelize(connectionString);
var userService = require("./userService")(sequelize);
var user = require("./model")(sequelize);

var authenticate = function(req, res) {
  user.User.findOne({where:{id:req.body.id}})
              .then(function(user) {
                var token = jwt.sign({username: user.username, password: user.password}, config.secret, {expiresIn: '10 hours' });
                console.log(token);
                res.send(token);
              }, function(err) {
                res.send(401);
              });
}

sequelize.authenticate().then(function(err) {
  if (err) {
    console.log("Unable to connect to database ", err);
  } else {
    console.log("Connection has been established");
  }
});

sequelize.sync().then(function(err){
  app.get("/users", userService.getUsers);
  app.post("/users", userService.createUser);
  app.post("/authenticate", authenticate);
  app.listen(5000);
});

app.use(bodyParser());
app.listen(3000);
