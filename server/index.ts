import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { AppRouterBuilder } from './src/api/app-router.builder';
import { ProxiesController } from './src/api/proxies/proxies.controller';
import { IpCheckService } from './src/services/ip-check.service';
import { ProxiesService } from './src/api/proxies/proxies.service';
import { ProxiesCache } from './src/api/proxies/proxies.cache';
import { MemoryCacheStorage } from './src/api/proxies/memory-cache-storage';
import { RequestSender } from './src/utils/request-sender'
import { sequelize, ProxyEntity } from './src/database'

const proxiesController = new ProxiesController({
  ipCheckService:  new IpCheckService({
    requestSender: new RequestSender('http://ipwho.is', axios)
  }),
  proxiesService: new ProxiesService({
    proxiesRepository: ProxyEntity
  }),
  proxiesCache: new ProxiesCache({
    storage: new MemoryCacheStorage(),
    lifetime: 12000
  })
});

const appRouter = new AppRouterBuilder({
  proxiesController,
}).build();

const port: string = process.env.PORT;

async function createDatabaseConnection() {
  return sequelize.sync()
  .then(() => {
    return sequelize
      .authenticate()
      .then(() => {
        console.info('Database connection has been established successfully.');
      })
      .catch((error) => {
        console.error('Unable to connect to the database:', error);
        throw error;
      });
  })
}

function createApplication() {
  const app: Express = express();

  app.use(cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    exposedHeaders: ['X-Pagination']
  }
  ));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.json());

  app.use(appRouter);

  return app;
}

const application = createApplication();

createDatabaseConnection()
  .then(() => {
    application.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    }); 
  });