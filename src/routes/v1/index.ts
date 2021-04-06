import express from 'express';
import testRoutes from './test';

const ApiRouter = express.Router()

ApiRouter
  .use('/test', testRoutes);

export default ApiRouter;