const connection = require('../configOficinaVirtual/dbconfigOficinaVirtual');
const crypto = require('crypto');
const { Request, TYPES } = require('tedious');
const login = (objectData) => {
    try {
        const { Email, PassWord } = objectData;
        const request = new Request(
            'SELECT * FROM Medico WHERE Email = @Email AND PassWord = @PassWord',
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );


        const usuarios = [];

        request.on('row', function (columns) {
            let usuario = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    return;
                }
                usuario[column.metadata.colName] = column.value;
            });
            usuarios.push(usuario);
        });


        request.addParameter('Email', TYPES.VarChar, Email);
        request.addParameter('PassWord', TYPES.VarChar, PassWord);

        connection.execSql(request);

        
        return new Promise((resolve, reject) => {
            request.on('requestCompleted', function (rowCount, more) {              

                const medico = usuarios[0];

                const token = crypto.randomBytes(16).toString('hex');

                const insertRequest = new Request(
                    'INSERT INTO Sesion (MedicoID, Token, FechaInicio) VALUES (@MedicoID, @Token, GETDATE())',
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            const dataResponse = {
                                MedicoID: medico.MedicoID,
                                Token: token,
                                NombreCompleto: medico.NombreCompleto,
                                Especialidad: medico.Especialidad
                            }
                            resolve(
                                { status: 200, message: 'Sesion iniciada correctamente', data: dataResponse }
                            )
                        }
                    }
                );
                insertRequest.addParameter('MedicoID', TYPES.Int, medico.MedicoID);
                insertRequest.addParameter('Token', TYPES.VarChar, token);

                connection.execSql(insertRequest);

            });
            request.on('error', function (err) {
                reject(err);
            });
        });

    } catch (error) {
        console.log(error);
    }
};

const createMedico = async (objectData) => {
    return new Promise((resolve, reject) => {
        const { NombreCompleto, Email, PassWord, Especialidad } = objectData;
        let mensaje = {};

        const request = new Request(
            'INSERT INTO Medico (NombreCompleto, Email, PassWord, Especialidad) VALUES (@NombreCompleto, @Email, @PassWord, @Especialidad)',
            (err) => {
                if (err) {
                    mensaje = { status: 500, message: 'Error en la base de datos' };
                    reject(mensaje);
                } else {
                    mensaje = { status: 200, message: 'Medico creado correctamente' };
                    resolve(mensaje);
                }
            }
        );

        request.addParameter('NombreCompleto', TYPES.VarChar, NombreCompleto);
        request.addParameter('Email', TYPES.VarChar, Email);
        request.addParameter('PassWord', TYPES.VarChar, PassWord);
        request.addParameter('Especialidad', TYPES.VarChar, Especialidad);

        connection.execSql(request);
    });
};

module.exports = { login, createMedico };
