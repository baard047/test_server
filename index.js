const express = require('express');
//const {Router} = require('express')
const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('Входящий запрос: ', req.data);
    res.send('ты пидор!');
});

app.post('/', (req, res) => {
    console.log('Входящий POST запрос: ', req.body);
    res.send("transfer:\"11\"");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

