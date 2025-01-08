const connectionOficinaVirtual = require('../configOficinaVirtual/dbconfigOficinaVirtual');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const postRegionales = async (objectData) => {
    try {
        console.log(objectData);
        const request = new Request(`
            INSERT INTO Regionales (Codigo, Nombre, Descripcion, Activo)
            VALUES ( @Codigo, @Nombre, @Descripcion, @Activo);
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
       


        connectionOficinaVirtual.execSql(request);

        let Regionales = [];

        request.on('row', function (columns) {
            let regionales = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                regionales[column.metadata.colName] = column.value;
            });
            Regionales.push(regionales);
        });

        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(Regionales);
            });

            request.on('error', function (err) {
                reject(err);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const getRegionales = async () => {
    try {
        const request = new Request(`SELECT * FROM Regionales;`, function (err) {
            if (err) {
                console.log(err);
            }
        });
        const Regionales = [];
        request.on('row', function (columns) {
            let regionales = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                regionales[column.metadata.colName] = column.value;
            });
            Regionales.push(regionales);
        });
        connectionOficinaVirtual.execSql(request);
        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(Regionales);
            });
            request.on('error', function (err) {
                reject(err);
            });
        });


    } catch (error) {
        console.log(error);
    }
}

const deleteRegionales = async (id) => {
    try {
        const Codigo = id.id;
        const request = new Request(`DELETE FROM Regionales WHERE Codigo = @id;`, function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('id', TYPES.Int, Codigo);
        const Regionales = [];
        request.on('row', function (columns) {
            let regionales = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                regionales[column.metadata.colName] = column.value;
            });
            Regionales.push(regionales);
        });
        connectionOficinaVirtual.execSql(request);
        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(Regionales);
            });
            request.on('error', function (err) {
                reject(err);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const updateRegionales = async (objectData) => {
    try {
        const request = new Request(`UPDATE Regionales SET Nombre = @Nombre, Descripcion = @Descripcion, Activo = @Activo WHERE Codigo = @Codigo;`, function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('Codigo', TYPES.Int, objectData.Codigo);
        request.addParameter('Nombre', TYPES.NVarChar, objectData.Nombre);
        request.addParameter('Descripcion', TYPES.NVarChar, objectData.Descripcion);
        request.addParameter('Activo', TYPES.Bit, objectData.Activo);
        connectionOficinaVirtual.execSql(request);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { postRegionales , getRegionales , deleteRegionales , updateRegionales };