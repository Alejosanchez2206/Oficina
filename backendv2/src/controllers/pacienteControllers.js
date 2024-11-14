const { getPacientes } = require('../model/pacientes');
exports.getPaciente = async (req, res) => {
    try {
        const result = await getPacientes(req.body);
        return res.status(200).json(
            {
                success: true,
                data: result
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
