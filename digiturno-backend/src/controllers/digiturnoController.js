const Turno = require('../models/Turno');
const socket = require('../socket'); // Importa la instancia de socket.io
const NumberTurno = require('../models/NumberTurno');

async function generarNumeroTurno(IdEmpresa, Prefijo) {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // 00:00:00
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59); // 23:59:59

  // Buscar si ya existe un número de turno para hoy y la empresa dada
  let numeroTurno = await NumberTurno.find({
    IdEmpresa: IdEmpresa,
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  });

  console.log(numeroTurno);
  if (numeroTurno.length === 0) {
    const newNumberTurno = new NumberTurno({
      IdEmpresa: IdEmpresa,
      Prefijo: Prefijo,
      Numero: 1
    });
    await newNumberTurno.save();
    return Prefijo + '1';
  } else {
    await NumberTurno.findByIdAndUpdate(numeroTurno[0]._id, {
      $inc: { Numero: 1 }
    }, {
      new: true
    })
    return Prefijo + (numeroTurno[0].Numero + 1);
  }
}


// Crear un nuevo turno
exports.crearTurno = async (req, res) => {
  try {
    const { IdEmpresa } = req.body;

    // Generar el número de turno
    const numeroGenerado = await generarNumeroTurno(IdEmpresa, 'GN-');

    // Crear el turno con el número generado
    const turno = new Turno({
      ...req.body,
      NumberTurno: numeroGenerado
    });

    await turno.save();

    return res.json({ success: true, data: turno });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener todos los turnos
exports.obtenerTurnos = async (req, res) => {
  try {
    const { id  , Especialidad} = req.params;
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // 00:00:00
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59); // 23:59:59
  
    // Buscar si ya existe un número de turno para hoy y la empresa dada
    let turnos = await Turno.find({
      IdEmpresa: id,
      Especialidad: Especialidad,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });
    
    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar el estado de un turno
exports.actualizarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findByIdAndUpdate(id, req.body, { new: true });
    if (!turno) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }
    res.status(200).json(turno);

    const { IdEmpresa } = turno; // Asumiendo que el turno tiene un campo empresaId
    io.to(IdEmpresa).emit('actualizarTurno', turno); // Notificar a todos los clientes en la sala de la empresa
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
