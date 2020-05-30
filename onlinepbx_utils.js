const log4js = require('./logger');
const logger = log4js.getLogger();

//TODO вынести все константы с менеджерами в отдельный файл когда разрастется
const Gleb = 10;
const Alexander = 11;

//TODO сделать таблицу с перечнем регионов

const managersTable = {
    69 : Gleb,
    47 : Alexander
};

const detectManager = (regionCode) => {
    const onlinePbxId = managersTable[regionCode];
    return onlinePbxId ? onlinePbxId : Gleb;
};

const logPhone = (data) => {
    const mainData = data[0];

    const reducedObject = {
        city_name: mainData.name,
        telcod: mainData.telcod,
        time_zone: mainData.time_zone,
        rajon: mainData.rajon,
        operator: mainData.oper_brand,
        region: data.region
    };

    logger.trace('Ответ от API: ', reducedObject);
};

module.exports.detectManager = detectManager;
module.exports.logPhone = logPhone;