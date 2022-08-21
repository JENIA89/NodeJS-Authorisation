import express, { Express } from 'express';
import { Server } from 'http';

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use('/users', (req, res) => {
      res.send('Hello users');
    });
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Server is running on ${this.port}`);
  }
}