const Connection = require('tedious').Connection;
const config = require('../config');

const Connectionconfig = {
    server: config.ssqlservername,
    authentication: {
        type: 'default',
        options: {
            userName: config.ssqlusername,
            password: config.ssqlpassword
        }
    },
    options: {
        instanceName: config.ssqlinstancename,
        database: config.ssqldatabaseoficinavirtual,
        trustedConnection: true,
        TrustServerCertificate: true,
        encrypt: false,
        trustServerCertificate: true // Intenta añadir esta opción también
    }
};

const connectionOficinaVirtual = new Connection(Connectionconfig);
connectionOficinaVirtual.on('connect', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to SQL Server --> database: ' + config.ssqldatabaseoficinavirtual);
    }
});


module.exports = connectionOficinaVirtual;