const express = require('express');
const cors    = require('cors');
const http    = require('http');
const { socketController } = require('../sockets/sockets.controller');

class Server {

    constructor() {

        this.app    = express();
        this.port   = process.env.PORT;
        this.server = http.createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {};

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();

        //Sockets
        this.sockets();
    }

    middlewares() {
        //CORS 
        this.app.use(cors());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        //Rutas
        // this.app.use( this.paths.auth, routerAuth );
    }

    sockets() {

        this.io.on('connection', socketController);
    }

    listen() {

        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server;