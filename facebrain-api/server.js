const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const { resolve } = require("path");

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
  database.select('email','hash').from('login')
  .where('email', '=', req.body.email)
  .then(data => {
    const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
    if(isValid){
      return database.select('*').from('users')
      .where('email', '=', req.body.email)
      .then(user => {
        res.json(user[0])
      })
      .catch(err => res.status(400).json("unable to get user"))
    }else{
      res.status(400).json("wrong credentials")
    }
  })
  .catch(err => res.status(400).json('Wrong email or password has been entered'))
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  database
    .transaction((trx) => {
      trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then((loginEmail) => {
          return trx('users')
            .returning('*')
            .insert({
              name: name,
              email: loginEmail[0],
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("account already exists"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  database
    .select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (users.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch((err) => res.status(400).json("error fetching user"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  database("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
});

app.listen(3000, () => {
  console.log("app is runnin on port 3000");
});
