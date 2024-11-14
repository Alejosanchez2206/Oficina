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
        database: config.ssqldatabasesios,
        trustedConnection: true,
        TrustServerCertificate: true,
        encrypt: false,
        trustServerCertificate: true // Intenta añadir esta opción también
    }
};

const connection = new Connection(Connectionconfig);
connection.on('connect', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to SQL Server --> database: ' + config.ssqldatabasesios);
    }
});


module.exports = connection;