const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());


app.use('/',(req, res, next) =>{
    res.send('<h1>Hello World!!</h1>');
});

module.exports = app;
