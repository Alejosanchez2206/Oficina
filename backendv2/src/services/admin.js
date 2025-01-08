const connection = require('../configOficinaVirtual/dbconfigOficinaVirtual');
const crypto = require('crypto');
const { Request, TYPES } = require('tedious');
const bcrypt = require('bcrypt');

const loginAdmin = (objectData) => {
   try {
     const { Email, PassWord } = objectData;
    
     const request = new Request(
        'SELECT * FROM Admin WHERE Email = @Email',
        function (err) {
           if (err) {
              console.log(err);
           }
        }
     );

     // Validar password en la base de datos
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

     connection.execSql(request);

     return new Promise((resolve, reject) => {
        request.on('requestCompleted', function (rowCount, more) {
           if (usuarios.length > 0) {
              bcrypt.compare(PassWord, usuarios[0].PassWord, function (err, res) {
                 if (res) {
                    const token = crypto.randomBytes(20).toString('hex');
                    resolve({ status: 200, token: token });
                 } else {
                    reject({ status: 400, message: 'Credenciales incorrectas' });
                 }
              });
           } else {
              reject({ status: 400, message: 'Credenciales incorrectas' });
           }
        });
     });

   } catch (error) {
      console.log(error);
   }
}


const registerAdmin = (objectData) => {
   try {
      return new Promise((resolve, reject) => {
         const { NombreCompleto, Email, PassWord } = objectData;
         let mensaje = {};

         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(PassWord, salt);

         const request = new Request(
            'INSERT INTO Admin (NombreCompleto, Email, PassWord) VALUES (@NombreCompleto, @Email, @PassWord)',
            (err) => {
               if (err) {
                  mensaje = { status: 500, message: 'Error en la base de datos' };
                  reject(mensaje);
               } else {
                  mensaje = { status: 200, message: 'Admin creado correctamente' };
                  resolve(mensaje);
               }
            }
         );

         request.addParameter('NombreCompleto', TYPES.VarChar, NombreCompleto);
         request.addParameter('Email', TYPES.VarChar, Email);
         request.addParameter('PassWord', TYPES.VarChar, hash);

         connection.execSql(request);
      })
   } catch (error) {
      console.log(error);
   }
}



module.exports = { loginAdmin, registerAdmin };