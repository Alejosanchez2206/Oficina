const { getModulos, postModulos } = require('../model/modulos');

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