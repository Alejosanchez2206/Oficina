const connectionOficinaVirtual = require('../configOficinaVirtual/dbconfigOficinaVirtual');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const postModulos = async (objectData) => {
    try {
        const request = new Request(`
            INSERT INTO Modulos (Codigo, Nombre, Descripcion, Activo, UndFuncional)
            VALUES (@Codigo, @Nombre, @Descripcion, @Activo, @UndFuncional);
            `,
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );

        request.addParameter('Codigo', TYPES.NVarChar, objectData.Codigo);
        request.addParameter('Nombre', TYPES.NVarChar, objectData.Nombre);
        request.addParameter('Descripcion', TYPES.NVarChar, objectData.Descripcion);
        request.addParameter('Activo', TYPES.Bit, objectData.Activo);
        request.addParameter('UndFuncional', TYPES.NVarChar, objectData.UndFuncional);


        connectionOficinaVirtual.execSql(request);

        let modulos = [];

        request.on('row', function (columns) {
            let modulo = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                modulo[column.metadata.colName] = column.value;
            });
            modulos.push(paciente);
        });

        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(modulos);
            });

            request.on('error', function (err) {
                reject(err);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const getModulos = async () => {
    try {
        const request = new Request(`SELECT * FROM Modulos;`, function (err) {
            if (err) {
                console.log(err);
            }
        });
        const modulos = [];
        request.on('row', function (columns) {
            let modulo = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                modulo[column.metadata.colName] = column.value;
            });
            modulos.push(modulo);
        });
        connectionOficinaVirtual.execSql(request);
        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(modulos);
            });
            request.on('error', function (err) {
                reject(err);
            });
        });


    } catch (error) {
        console.log(error);
    }
}

module.exports = { postModulos , getModulos };