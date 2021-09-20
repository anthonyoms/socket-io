//Referencia del HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');
const socket = io();

socket.on('connect', () => {

    console.log( 'cliente conenctado' );

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('disconnect', () => {

    console.log( 'cliente desconectado del servidor' );

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';

});

socket.on('enviar-mensaje', (payload) => {

   console.log(payload);

});

btnEnviar.addEventListener( 'click', () => {

    const msj = txtMensaje.value;
    const payload = {
        msj,
        id:'123',
        fecha: new Date().getTime()
    };

    socket.emit( 'enviar-mensaje', payload, (id) => {
        console.log('Todo ok', id);
    } );
})