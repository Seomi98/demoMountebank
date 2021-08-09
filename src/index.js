const mb = require('mountebank');
const settings = require('./settings');
const getService = require('./get-service');
const createService = require('./create-service');
const deleteService = require('./delete-service');
const updateService = require('./update-service');

const mbServerInstance = mb.create({
    port: settings.port,
    pidfile: '../mb.pid',
    logfile: '../mb.log',
    protofile: '../protofile.json',
    ipWhitelist: ['*']
});

mbServerInstance.then(function () {
    getService.addService();
    createService.addService();
    deleteService.addService();
    updateService.addService();
});