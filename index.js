const express = require('express');
//const {Router} = require('express')
const app = express();
//const router = Router();

app.use(express.json({ extended: true }));

app.get('/', (req, res) => {
    console.log('Входящий запрос: ', req.data);
    res.send('Hello World from Bard-server!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});