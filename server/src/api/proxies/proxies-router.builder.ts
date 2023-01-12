import express from 'express';

import { ProxiesController } from './proxies.controller';

export class ProxiesRouterBuilder {
    private proxiesController: ProxiesController;
    constructor({
        proxiesController
    }) {
        this.proxiesController = proxiesController;
    }

    build() {
        const router = express.Router();

        router
            .get(
                '/:ip/info',
                (...params) => this.proxiesController.getProxyInformation(...params)
            )

        return router;
    }
}
