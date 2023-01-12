import express from 'express';
import { ProxiesRouterBuilder } from './proxies/proxies-router.builder';

export class AppRouterBuilder {
    private proxiesController;

    constructor({ proxiesController }) {
        this.proxiesController = proxiesController;
    }

    build() {
        const router = express.Router();

        const proxiesRouterBuilder = new ProxiesRouterBuilder({
            proxiesController: this.proxiesController
        });

        router
            .use('/api/v1/proxies', proxiesRouterBuilder.build())

        return router;
    }
}
