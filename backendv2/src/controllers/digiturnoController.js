const { generarTurno, getTurnos } = require('../services/consulta');

exports.crearTurno = async (req, res) => {
  try {
    const turno = await generarTurno(req.body);

    if (!turno) return res.status(404).json({ success: false, message: 'Turno no generado' });
    res.status(200).json(
      {
        success: true,
        data: turno
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTurnos = async (req, res) => {
  try {
    const turnos = await getTurnos(req.params);
    res.status(200).json(
      {
        success: true,
        data: turnos
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};