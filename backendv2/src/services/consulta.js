const connection = require('../configOficinaVirtual/dbconfigOficinaVirtual');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const generarTurno = async (turnoData) => {
    try {
        const request = new Request('GenerarTurnoConsecutivo', function (err) {
            if (err) {
                console.error(err);
            }
        });

        // Añadir los parámetros
        request.addParameter('Turno', TYPES.VarChar, turnoData.Turno);
        request.addParameter('FechaInicio', TYPES.DateTime, turnoData.FechaInicio);
        request.addParameter('Estado', TYPES.BigInt, turnoData.Estado);
        request.addParameter('Paciente', TYPES.VarChar, turnoData.Paciente);
        request.addParameter('IdPaciente', TYPES.VarChar, turnoData.IdPaciente);
        request.addParameter('FechaNacimiento', TYPES.Date, turnoData.FechaNacimiento);
        request.addParameter('Especialidad', TYPES.VarChar, turnoData.Especialidad);
        request.addParameter('IdEmpresa', TYPES.VarChar, turnoData.IdEmpresa);
        request.addParameter('EstadoTurno', TYPES.VarChar, turnoData.EstadoTurno);

        let resultado = {};

        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value !== null) {
                    resultado[column.metadata.colName] = column.value;
                }
            });
        });

        connection.callProcedure(request);

        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(resultado);
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const getTurnos = async (objectData) => {
    try {
        const { Especialidad, IdEmpresa } = objectData;
        console.log(Especialidad , )
        const request = new Request('SELECT * FROM Turnos WHERE Estado = 1 AND Especialidad = @Especialidad AND IdEmpresa = @IdEmpresa', function (err) {
            if (err) {
                console.error(err);
            }
        });

        request.addParameter('Especialidad', TYPES.VarChar, Especialidad);
        request.addParameter('IdEmpresa', TYPES.VarChar, IdEmpresa);
        
        let turnos = [];

        request.on('row', function (columns) {
            let turno = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                turno[column.metadata.colName] = column.value;
            });
            turnos.push(turno);
        });

        connection.execSql(request);

        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {
                resolve(turnos);
            });
        });

    }catch (error) {
        console.error(error);
    }
};

module.exports = {
    generarTurno,
    getTurnos
};
