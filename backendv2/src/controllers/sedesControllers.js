const { getSedes, postSedes , deleteSedes  , updateSedes} = require('../services/sedes');

exports.postSedes = async (req, res) => {
    try {
        const modulos = await postSedes(req.body);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSedes = async (req, res) => {
    try {
        const modulos = await getSedes();
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.deleteSedes = async (req, res) => {
    try {
        const modulos = await deleteSedes(req.params);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateSedes = async (req, res) => {
    try {
        const { id } = req.params;
        const modulos = await updateSedes(req.body);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
