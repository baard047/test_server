const log4js = require('log4js');

const layoutPattern = {
    type: 'pattern',
    pattern: '[%d{yyyy-MM-dd hh:mm:ss}] %p: %m',
};

log4js.configure({
    appenders: {
        number_requests: { type: 'file', filename: 'log/number_requests.log', layout: layoutPattern },
        console: { type: 'console', layout: layoutPattern }
    },
    categories: { default: { appenders: ['number_requests', 'console'], level: 'all' } }
});

module.exports = log4js;