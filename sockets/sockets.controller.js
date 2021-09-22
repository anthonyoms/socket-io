const TicketController = require("../models/ticket.controller");

const ticketController = new TicketController;

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketController.ultimo);
    socket.emit('estado-actual', ticketController.ultimos4);
    socket.emit('tickets-pendientes', ticketController.cola)
    
    

    socket.on('siguiente-ticket', (paylaod, callback) => {

        const siguiente = ticketController.siguiente();
        socket.broadcast.emit('tickets-pendientes', ticketController.cola)
        callback( siguiente );
    });

    socket.on('atender-ticket', ({escritorio}, callback) => {

        if (!escritorio) {

            return callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            })
            
        }

        const ticket = ticketController.atenderTicket(escritorio);
        socket.broadcast.emit('estado-actual', ticketController.ultimos4);
        socket.broadcast.emit('tickets-pendientes', ticketController.cola)

        if (!ticket) {
            return callback({
                ok:false,
                msg:'no hay tikect pendientes'
            })
        }else {
            callback({
                ok:true,
                ticket,
                cola : ticketController.cola
               
            })
        }
    })
};

module.exports = {
    socketController
}