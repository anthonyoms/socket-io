//Referencias html
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');

lblEscritorio.innerHTML = escritorio;

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;
    divAlert.style.display = 'none'

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;

});

socket.on('tickets-pendientes', (cola) => {

    console.log(cola);
    lblPendientes.innerHTML = cola

});

btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', {
        escritorio
    }, ({
        ok,
        msg,
        ticket,
        cola
    }) => {

        if (!ok) {
            lblTicket.innerHTML = 'nadie';
            return divAlert.style.display = '';
        }

        lblPendientes.innerHTML = cola;
        lblTicket.innerHTML = 'Ticket' + ticket.numero;
    });

});

console.log('Nuevo Ticket HTML');