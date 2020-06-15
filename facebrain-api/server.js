const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "Ryan McGuiness",
      email: "ryanmcguiness123@gmail.com",
      password: "password",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Matt Farrell",
      email: "bigvag@gmail.com",
      password: "password123",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.send("signing in");
  } else {
    res.status(400).json("error signing in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
	  found = true;
	  user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(3000, () => {
  console.log("app is runnin on port 3000");
});

