const socket = io('http://localhost:5000');
const UrlApi = 'http://localhost:5000'

async function submitForm() {
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const numeroDocumento = document.getElementById('numeroDocumento').value;
    const especialidad = document.getElementById('especialidad').value;
    const empresaId = uniqueId;
    const estado = "Pendiente";
    const data = {
        TipoID: tipoDocumento,
        identificacion: numeroDocumento,
        Especialidad: especialidad,
        IdEmpresa: empresaId,
        EstadoTurno: estado
    };

    try {
        const responseSios = await fetch(UrlApi+"/api/paciente", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!responseSios.ok) {
            throw new Error(`Error: ${responseSios.status}`);
        }

        const responseDataSios = await responseSios.json();

        if (responseDataSios.data.length != 0) {

            const getCurrentDateTime = () => {
                const now = new Date();
                return now.toISOString();
            };

            const turnoData = {
                ...data,
                Turno: "GN",
                FechaInicio: getCurrentDateTime(),
                Estado: 1,
                Paciente: `${responseDataSios.data[0].PrimerNombre} ${responseDataSios.data[0].SegundoNombre} ${responseDataSios.data[0].PrimerApellido} ${responseDataSios.data[0].SegundoApellido}`,
                IdPaciente: responseDataSios.data[0].identificacion,
                FechaNacimiento: responseDataSios.data[0].FechaNac
            };


            const responseTurno = await fetch(UrlApi+"/api/digiturno", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(turnoData)
            });

            const responseData = await responseTurno.json();

            if (responseData.data.length != 0) {               

                // Emitir el evento a través de Socket.IO
                socket.emit('nuevoTurno', responseData.data);

                document.getElementById('numeroTurno').textContent = responseData.data.NroTurno;
                openModal();
                closeModalAdd()
            } else {
                console.error('Failed to submit turno');
            }
        } else {
            openModalAdd();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function openModal() {
    document.getElementById('turnoModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('turnoModal').style.display = 'none';
}

function openModalAdd() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModalAdd() {
    document.getElementById('myModal').style.display = 'none';
}

async function submitFormAdd() {
    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString();
    };

    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const numeroDocumento = document.getElementById('numeroDocumento').value;
    const especialidad = document.getElementById('especialidad').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const empresaId = uniqueId;
    const estado = "Pendiente";
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();

    const nombresArray = nombres.split(' ');
    const apellidosArray = apellidos.split(' ');

    let nombre1 = nombresArray[0] || '';
    let nombre2 = nombresArray[1] || '';
    let apellido1 = apellidosArray[0] || '';
    let apellido2 = apellidosArray[1] || '';

    const dataRequest = {
        Turno: "GN",
        FechaInicio: getCurrentDateTime(),
        Estado: 1,
        Paciente: `${nombre1} ${nombre2} ${apellido1} ${apellido2}`,
        IdPaciente: numeroDocumento,
        FechaNacimiento: fechaNacimiento,
        Especialidad: especialidad,
        IdEmpresa: empresaId,
        EstadoTurno: estado,
        TipoID: tipoDocumento
    };

    const responseTurno = await fetch(UrlApi+"/api/digiturno", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dataRequest)
    });
    const responseData = await responseTurno.json();
    if (responseData.data.length != 0) {
         // Emitir el evento a través de Socket.IO
        socket.emit('nuevoTurno', responseData.data);

        document.getElementById('numeroTurno').textContent = responseData.data.NroTurno;
        openModal();
        closeModalAdd()
    } else {
        console.error('Failed to submit turno');
    }

}
