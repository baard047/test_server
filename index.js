const express = require('express');
const axios = require('axios');
const config = require('config');

const log4js = require('./logger');
const logger = log4js.getLogger();

const app = express();
const onlinePbx = require('./onlinepbx_utils');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = 'http://htmlweb.ru/geo/api.php?json';
const API_KEY = config.get('API_KEY');

/////////////////////////////////////////////////////

const getPhoneData = async (phone) => {
    try {
        logger.trace(`Отправка запроса к API на пробив телефонного номера ${phone}`);
        const response = await axios.post(`${API_URL}&telcod=${phone}&api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        logger.error('API request error: ', error);
    }
};

app.post('/', async (req, res) => {
    try {
        if( !req.body ) {
            logger.error('Невозможно разобрать тело запроса!');
            return;
        }

        logger.trace('Входящий POST запрос: ', req.body);
        const caller = req.body.caller_number;
        const data = await getPhoneData(caller);
        onlinePbx.logPhone(data);
        const pbxId = onlinePbx.detectManager(data.region.autocod);
        logger.trace(`Выполняется перевод входящего звонка с номера ${caller} на менеджера с ID ${pbxId}`);
        res.send(`transfer:\"${pbxId}\"`);

    } catch (error) {
        logger.error('ERROR: ', error);
    }
});

app.get('/', (req, res) => {
    console.log('Входящий GET запрос: ', req.data);
    res.send('Ты пидор!');
});

const PORT = config.get('port') || 3000;

const start = () => {
    try {
        app.listen(PORT, () => logger.trace(`Сервер запущен на порту ${PORT}`));
    } catch (error) {
        logger.error("Server error: ", error);
    }
};

start();