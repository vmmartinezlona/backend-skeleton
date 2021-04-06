import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(__dirname, "../.env") });
import { HttpServer } from './server';
import { appConfig } from './config';

const server = new HttpServer(appConfig.port);

server.start(() => {
  console.log(`Server started listening at port:${server.getPort()}`);
});
