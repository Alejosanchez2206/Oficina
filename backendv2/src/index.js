const express = require('express');
const http = require('http');

const path = require('path');
const config = require('./config');
const cors = require('cors');
const socketIo = require('socket.io');
const ConectiosSqlSios = require('./configSios/dbconfigSios');
const ConectiosSqlOficinaVirtual = require('./configOficinaVirtual/dbconfigOficinaVirtual');
const app = express();
const server = http.createServer(app);

//Importacion Routes 
const pacientesRoutes = require('./routes/pacientesRouter');
const modulosRoutes = require('./routes/modulosRoutes');
const digiturnoRoutes = require('./routes/digiturnoRoutes');
const medicoRouter = require('./routes/medicoRouter');
const obtenerCitas = require('./routes/obtenerCitasControllers');

// Configuraciones
app.use(cors({
    origin: 'https://localhost:7097',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));

const io = socketIo(server, {
    cors: {
        origin: 'https://localhost:7097',
        methods: ["GET", "POST"]
    }
});

// Middleware para compartir el objeto io
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Eventos de socket io
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('joinRoom', (uniqueId) => {
        socket.join(uniqueId);
        console.log(`Cliente con id ${socket.id} se unió al room ${uniqueId}`);
    });

    socket.on('mensaje', (msg) => {
        console.log('Mensaje recibido:', msg);
        socket.emit('respuesta', 'Mensaje recibido en el servidor');
    });

    socket.on('joinRoom', (IdEmpresa) => {
        socket.join(IdEmpresa);
        console.log(`Cliente unido al room: ${IdEmpresa}`);
    });

    socket.on('nuevoTurno', (data) => {
        console.log('Nuevo turno recibido:', data);
        // Aquí puedes emitir el evento a todos los clientes conectados o a un room específico
        io.emit('nuevoTurno', data);
    });

    socket.on('llamarTurno', async (data) => {
        try {
            console.log('Llamando turno:', data);

            // Emitir un evento para actualizar a todos los clientes en la misma sala
            io.to(data.uniqueId).emit('actualizarTurno', data);
        } catch (error) {
            console.log(error);
        }

    });

    socket.on('atenderTurno', async (data) => {
        try {
            console.log('Atendiendo turno:', data);
            // Emitir un evento para actualizar a todos los clientes en la misma sala
            io.to(data.uniqueId).emit('actualizarTurnoDasboard', data);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});



// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());

// Routes
app.use('/api/paciente', pacientesRoutes);
app.use('/api/modulos', modulosRoutes);
app.use('/api/digiturno', digiturnoRoutes);
app.use('/api/medico', medicoRouter);
app.use('/api/obtenerCitas', obtenerCitas);
app.use('/api/Historial', obtenerCitas);

// Connect to Sql Server sios
ConectiosSqlSios.connect((err) => {
    if (err) {
        console.log(err);
    }
});

// Connect to Sql Server oficinavirtual
ConectiosSqlOficinaVirtual.connect((err) => {
    if (err) {
        console.log(err);
    }
});

// Start the server
server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
