const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const { resolve } = require("path");
const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");


const database = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "mcguiness",
    password: "",
    database: "faceBrain",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  database
    .select("*")
    .from("users")
    .then((users) => res.json(users));
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, database, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, database, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, database);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, database);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is runnin on port 3000");
});
