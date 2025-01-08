const { getModulos, postModulos , deleteModulos  , updateModulo} = require('../services/modulos');

exports.postModulos = async (req, res) => {
    try {
        const modulos = await postModulos(req.body);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getModulos = async (req, res) => {
    try {
        const modulos = await getModulos();
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.deleteModulos = async (req, res) => {
    try {
        const modulos = await deleteModulos(req.params);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateModulo = async (req, res) => {
    try {
        const { id } = req.params;
        const modulos = await updateModulo(req.body);
        res.json({
            success: true,
            data: modulos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
