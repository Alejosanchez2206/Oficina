const { loginAdmin, registerAdmin } = require('../services/admin');

exports.loginAdmin = async (req, res) => {
    try {
        const admin = await loginAdmin(req.body);
        if (admin.status === 400) return res.status(400).json({ success: false, message: admin.message });
        res.status(200).json({ success: admin.status, token: admin.token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.registerAdmin = async (req, res) => {
    try {
        const admin = await registerAdmin(req.body);
        res.status(200).json({ success: admin.status, data: admin.data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};