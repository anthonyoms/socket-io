const socketController = (socket) => {

    console.log('cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('cliente desconectado', socket.id);
    });

    socket.on('enviar-mensaje', (paylaod, callback) => {


        const id = 123456789;
        callback({
            id,
            fecha: new Date().getTime()
        })
        socket.broadcast.emit('enviar-mensaje', paylaod);


    });
};

module.exports = {
    socketController
}