const path = require('path');
const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
}

class TicketController {

    constructor() {

        this.ultimo   = 0;
        this.hoy      = new Date().getDate();
        this.ultimos4 = [];
        this.tickets  = [];
        this.cola     = 0;
        this.init();

    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            ultimos4: this.ultimos4,
            tickets: this.tickets,
            cola: this.cola
        }
    }

    init() {

        const {
            hoy,
            tickets,
            ultimos4,
            ultimo,
            cola
        } = require('../db/data.json')

        if (hoy === this.hoy) {

            this.tickets = tickets;
            this.ultimos4 = ultimos4;
            this.ultimo = ultimo;
            this.cola = cola;

        } else {

            this.guardarDb();
        }

    }

    guardarDb() {

        const pathDb = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(pathDb, JSON.stringify(this.toJson));
    }

    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.cola = this.tickets.length;

        this.guardarDb();

        return 'Ticket' + ticket.numero;
    }

    atenderTicket(escritorio) {
        const colaTickets =  this.tickets.length
        //saber si existe algun ticket
        if (colaTickets === 0) return null;

        const ticket = this.tickets.shift();

        this.cola = this.tickets.length;

        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(- 1, 1);
        }

        this.guardarDb();

        return ticket;



    }

}

module.exports = TicketController;