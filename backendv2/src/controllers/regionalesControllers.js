const { getRegionales, postRegionales , deleteRegionales  , updateRegionales} = require('../services/regionales');

exports.postRegionales = async (req, res) => {
    try {
        const modulos = await postRegionales(req.body);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRegionales = async (req, res) => {
    try {
        const modulos = await getRegionales();
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.deleteRegionales = async (req, res) => {
    try {
        const modulos = await deleteRegionales(req.params);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateRegionales = async (req, res) => {
    try {
        const { id } = req.params;
        const modulos = await updateRegionales(req.body);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
