import express, { Express } from 'express';
import cors from 'cors';
import { appConfig, dbConnection } from './config';
import { responseMiddleware } from './middlewares';
import ApiRouter from './routes/v1';

class Application {
    private readonly app: Express;

    constructor() {
      this.app = express();
      this.registerPreMiddleware();
      this.registerRoutes();
    }

    private registerPreMiddleware() {
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      // add response middleware
      this.app.use(responseMiddleware);
    }

    private registerRoutes() {
      this.app.use(`/api/${appConfig.apiVersion}`, ApiRouter);
      this.app.get(`/api/${appConfig.apiVersion}`, (req, res: any) => {
          res.success({ name: 'Test API', apiVersion: appConfig.apiVersion });
      });
    }

    public getApp() {
      return this.app;
    }
}

export default Application;

