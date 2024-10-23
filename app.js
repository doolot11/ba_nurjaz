var express = require('express');
var app = express();
const mongoose = require("mongoose")
const AllRoute = require("./src/routes/AllRoute.js")
const cors = require('cors');
const path = require('path');

// app.use(cors());'https://nurjazkg.ru:3000, http://localhost:3000'
const allowedOrigins = ['https://nurjazkg.ru', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  // Разрешить запросы, если домен присутствует в списке
    } else {
      callback(new Error('Not allowed by CORS'));  // Отклонить запросы с других доменов
    }
  }, // Разрешить запросы только с этого домена
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Разрешить определённые методы
  // allowedHeaders: ['Content-Type', 'Authorization'], // Указать допустимые заголовки
}));


app.get('/', function (req, res) {
  res.send('<h1 style="color:blue;">Hello World!</h1>');
});

app.use(express.json())
app.use("/", AllRoute)
app.use(express.static(__dirname))
app.use('/upload', express.static(path.join(__dirname, '/upload')));

// const url = "mongodb://localhost:27017/nurjaz"
const url = "mongodb://nurjaz_123:nurjaz_321@nurjazkg.ru/nurjaz";

mongoose.connect(url)
app.listen(3001, function () {
  console.log('Example app listening on port 3000! on http://localhost:3001');
});