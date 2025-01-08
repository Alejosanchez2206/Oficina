const connectionOficinaVirtual = require('../configOficinaVirtual/dbconfigOficinaVirtual');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const postSedes = async (objectData) => {
    try {
        console.log(objectData);
        const request = new Request(`
            INSERT INTO Sedes (Codigo, Nombre, Descripcion, Activo)
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

        let Sedes = [];

        request.on('row', function (columns) {
            let sedes = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                sedes[column.metadata.colName] = column.value;
            });
            Sedes.push(sedes);
        });

        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(Sedes);
            });

            request.on('error', function (err) {
                reject(err);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const getSedes = async () => {
    try {
        const request = new Request(`SELECT * FROM Sedes;`, function (err) {
            if (err) {
                console.log(err);
            }
        });
        const Sedes = [];
        request.on('row', function (columns) {
            let sedes = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                sedes[column.metadata.colName] = column.value;
            });
            Sedes.push(sedes);
        });
        connectionOficinaVirtual.execSql(request);
        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(Sedes);
            });
            request.on('error', function (err) {
                reject(err);
            });
        });


    } catch (error) {
        console.log(error);
    }
}

const deleteSedes = async (id) => {
    try {
        const Codigo = id.id;
        const request = new Request(`DELETE FROM Sedes WHERE Codigo = @id;`, function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('id', TYPES.Int, Codigo);
        const Sedes = [];
        request.on('row', function (columns) {
            let sedes = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                sedes[column.metadata.colName] = column.value;
            });
            Sedes.push(sedes);
        });
        connectionOficinaVirtual.execSql(request);
        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(Sedes);
            });
            request.on('error', function (err) {
                reject(err);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const updateSedes = async (objectData) => {
    try {
        const request = new Request(`UPDATE Sedes SET Nombre = @Nombre, Descripcion = @Descripcion, Activo = @Activo WHERE Codigo = @Codigo;`, function (err) {
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

module.exports = { postSedes , getSedes , deleteSedes , updateSedes };