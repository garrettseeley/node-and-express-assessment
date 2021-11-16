const express = require("express");
//const morgan = require("morgan");
const app = express();
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos")

//app.use(morgan("dev"));

app.get("/check/:zip", validateZip, (req, res, next) => {
    const zip = req.params.zip;
    if (getZoos(zip)){
        res.send(`${zip} exists in our records.`)
    } else {
        res.send(`${zip} does not exist in our records.`)
    }
});

app.get("/zoos/all", (req, res, next) => {
  const all= req.params.all;
  const admin = req.query.admin;
  const zoos = getZoos(all);
  if(admin === "true") {
    res.send(`All zoos: ${zoos.join("; ")}`)
  } else {
    res.send("You do not have access to that route.")
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
    const zip = req.params.zip;
    const zoos = getZoos(zip)
    if (zoos.length) {
      res.send(`${zip} zoos: ${zoos.join('; ')}`)
    } else {
      res.send(`${zip} has no zoos.`)
    }
});



app.use((req, res, next) => {
  res.send(`That route could not be found!`);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

module.exports = app;
