var express = require('express');
var app = express();
const mongoose = require("mongoose")
const AllRoute = require("./src/routes/AllRoute.js")
const cors = require('cors');
const path = require('path');

app.use(cors());
app.get('/', function (req, res) {
  res.send('<h1 style="color:blue;">Hello World!</h1>');
});

app.use(express.json())
app.use("/api/", AllRoute)
app.use(express.static(__dirname))
app.use('/upload', express.static(path.join(__dirname, '/upload')));

const url = "mongodb://localhost:27017/nurjaz"

mongoose.connect(url)
app.listen(3001, function () {
  console.log('Example app listening on port 3000! on http://localhost:3001');
});