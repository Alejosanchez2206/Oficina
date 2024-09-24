const mongoose = require('mongoose');

const MedicoSchema = new mongoose.Schema({  
    Nombre: {
        type: String
    },
    Apellido: {
        type: String
    },
    Email: {
        type: String
    },
    Telefono: {
        type: String
    },
    Especialidad: {
        type: String
    },
    IdEmpresa: {
        type: String
    },
    PassWord: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Medicos', MedicoSchema)