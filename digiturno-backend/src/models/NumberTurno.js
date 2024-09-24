const mongoose = require('mongoose');

const NumberTurnoSchema = new mongoose.Schema({  
    Numero: {
        type: Number
    },
    Prefijo : {
        type: String
    },
    IdEmpresa : {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('NumberTurnos', NumberTurnoSchema)