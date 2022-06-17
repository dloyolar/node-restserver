const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = '/api/users';

    // middlewares
    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    // READ AND PARSE OF BODY
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => console.log('Running on port', this.port));
  }
}

module.exports = Server;
