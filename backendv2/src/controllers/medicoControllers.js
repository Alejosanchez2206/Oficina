const { login, createMedico } = require('../services/medico');
exports.crearMedico = async (req, res) => {
    try {
        const medico = await createMedico(req.body);
        res.status(201).json({ success: medico.status, message: medico.message });
    } catch (error) {
        res.status(500).json({ success: medico.status, message: medico.message });
    }
}

exports.loginMedico = async (req, res) => {
    try {
        const medico = await login(req.body);
        res.status(200).json({ success: medico.status, data: medico.data });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}