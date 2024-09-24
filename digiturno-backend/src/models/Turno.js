const mongoose = require('mongoose');


const TurnoSchema = new mongoose.Schema({
  NumeroDocumento: {
    type: Number,
    required: true,
  },
  TipoDocumento: {
    type: String,
    required: true
  },
  EstadoTurno: {
    type: String,
    enum: ['Pendiente', 'Atendido'],
    default: 'Pendiente'
  },
  NumberTurno: {
    type: String,
    required: true
  },
  Especialidad: {
    type: String,
    required: true
  },
  IdEmpresa: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Turnos', TurnoSchema);
