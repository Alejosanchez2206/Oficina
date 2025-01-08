// socket.js
let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server);
    console.log('Socket initialized');
    io.on('connection', (socket) => {
      console.log('A user connected');      
      
      // Aquí puedes manejar los eventos de socket
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};
