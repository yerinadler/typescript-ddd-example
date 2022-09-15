import { json, urlencoded } from 'body-parser';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { errorMiddleware } from './middlewares/error.middleware';

export const initialiseApiServer = (server: InversifyExpressServer) => {
  server.setConfig(setupExpressApi);
  server.setErrorConfig((app: Application) => {
    app.use(errorMiddleware);
  });
};

export const setupExpressApi = (app: Application) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
};

export const setupErrorHandler = (app: Application) => {
  app.use(errorMiddleware);
};
