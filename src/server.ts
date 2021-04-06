import * as http from 'http';
import Application from './app';
import { Express } from 'express';

export class HttpServer {
  private readonly port: number;
  private readonly server: http.Server;
  private readonly app: Express;

  constructor(port: string) {
    this.port = parseInt(port);
    this.app = new Application().getApp();
    this.server = http.createServer(this.app);
  }

  start(cb?: () => any) {
    return this.server.listen(this.port, cb);
  }

  stop(cb?: () => any) {
    return this.server.close(cb);
  }

  getPort() {
    return this.port;
  }
}
