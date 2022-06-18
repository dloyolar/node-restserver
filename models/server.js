const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = '/api/users';

    // Connect DB
    this.connectDB();

    // middlewares
    this.middlewares();

    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
