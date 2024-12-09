const axios = require('axios');

const obtenerCitas = async (req, res) => {
    try {
        const { idPaciente , idEmpresa } = req.params;
        const response = await axios.post(`http://citaswebdev-env.eba-psvxdkw6.us-west-2.elasticbeanstalk.com/custom/full_oper.php?idPaciente=${idPaciente}&IdEmpresa=${idEmpresa}&opcion=Historial`);
        res.status(200).json(response.data);

    } catch (error) {
        console.log(error);
    }
}

const obtenerHistorial = async (req, res) => {
    try {
        const { numeroDocumento , tipoDocumento , idEmpresa } = req.params;
        const response = await axios.post(`http://citaswebdev-env.eba-psvxdkw6.us-west-2.elasticbeanstalk.com/custom/full_oper.php?id=${numeroDocumento}&tipo_id=${tipoDocumento}&IdEmpresa=${idEmpresa}&opcion=BuscarPacientesSIOS&_=1732721379018`);
        res.status(200).json(response.data);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    obtenerCitas,
    obtenerHistorial
}