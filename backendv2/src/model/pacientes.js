const connection = require('../configSios/dbconfigSios');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const getPacientes = async (objectData) => {
    try {
        const request = new Request(`ObtenerPacientePorIdentificacionOficinaVirtual`,
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
        request.addParameter('identificacion', TYPES.NVarChar, objectData.identificacion);
        request.addParameter('TipoID', TYPES.NVarChar, objectData.TipoID);

        let pacientes = [];

        request.on('row', function (columns) {
            let paciente = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                paciente[column.metadata.colName] = column.value;
            });
            pacientes.push(paciente);
        });

        connection.callProcedure(request);

        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(pacientes);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getPacientes
};