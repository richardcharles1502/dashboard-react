const express      = require('express')
const app          = express()
const port         = 4200
const cors         = require("cors");
const bodyParser   = require("body-parser");
const mongoose     = require("mongoose");
const userModel    = require("./model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/dashboard', { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get("/allusers", async (request, response) => {
  const users = await userModel.find();
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/user/:email", async (request, response) => {
  const useremail = request.params.email;
  const users = await userModel.findOne({email:useremail});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/login/:email", async (request, response) => {
  const useremail = request.params.email;
  const users = await userModel.find({email:useremail});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/add_user", async (request, response) => {
  const user = new userModel(request.body.data);
  try {
    await user.save();
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/updateuser/:email", async (request, response) => {
  const useremail = request.params.email;
  const users = await userModel.findOneAndUpdate({email:useremail},{$set:{firstname:request.body.data.firstname ,lastname:request.body.data.lastname, email:request.body.data.email, password:request.body.data.password, usergroup:request.body.data.usergroup}});
  try {
    response.status(200).send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/deletuser/:email", async (request, response) => {
  const useremail = request.params.email;
  const users = await userModel.deleteOne({email:useremail});
  try {
    response.status(200).send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log(`dashboard app listening on port ${port}`)
})

