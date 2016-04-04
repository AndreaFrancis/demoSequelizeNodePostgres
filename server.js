//Initializing express server
var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser());
var helloWorld = function(req, res) {
  res.send("Hello World");
}

// Initializing Sequalize
var Sequelize = require("sequelize");
var connectionString = "postgres://postgres:postgres@localhost:5432/test";
var sequelize = new Sequelize(connectionString);
var userService = require("./userService")(sequelize);

//Checking data base connectionString
sequelize.authenticate().then(function(err) {
  if (err) {
    console.log("Unable to connect to database ", err);
  } else {
    console.log("Connection has been established");
  }
});

//Sync model with data base
// -- { force:true } to reset database
sequelize.sync().then(function(err){
  app.get("/users", userService.getUsers);
  app.post("/users", userService.createUser);
  app.get("/",helloWorld);
  app.listen(5000);
});

app.listen(3000);
