const MedicoSchema = require('../models/Medico');


exports.crearMedico = async (req, res) => {
    try {   
        const medico = new MedicoSchema(req.body);
        await medico.save();
        return res.json({ success: true, data: medico });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.obtenerMedicos = async (req, res) => {
    try {
        const medicos = await MedicoSchema.find();
        res.status(200).json(medicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.actualizarMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const medico = await MedicoSchema.findByIdAndUpdate(id, req.body, { new: true });
        if (!medico) {
            return res.status(404).json({ success: false, message: 'Medico no encontrado' });
        }
        res.status(200).json({ success: true, data: medico });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.eliminarMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const medico = await MedicoSchema.findByIdAndDelete(id);
        if (!medico) {
            return res.status(404).json({ success: false, message: 'Medico no encontrado' });
        }
        res.status(200).json({ success: true, data: medico });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


exports.loginMedico = async (req, res) => {
    try {
        const { Email, PassWord } = req.body;
        const medico = await MedicoSchema.findOne({ Email });
        if (!medico) {      
            return res.status(404).json({ success: false, message: 'Datos incorrectos' });
        }   
        if (medico.PassWord !== PassWord) {
            return res.status(401).json({ success: false, message: 'Datos incorrectos' });
        }
        let DataResponse = {
            NombreCompleto: medico.Nombre + ' ' + medico.Apellido,
            Especialidad: medico.Especialidad
        }
        res.status(200).json({ success: true, data: DataResponse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}