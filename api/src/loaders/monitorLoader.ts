/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import basicAuth from 'express-basic-auth';
import monitor from 'express-status-monitor';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { env } from '../env';

export const monitorLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.monitor.enabled) {
        const expressApp = settings.getData('express_app');

        expressApp.use(monitor());
        expressApp.get(
            env.monitor.route,
            env.monitor.username ? basicAuth({
                users: {
                    [`${env.monitor.username}`]: env.monitor.password,
                },
                challenge: true,
            }) : (req, res, next) => next(),
            monitor().pageRoute
        );

    }
};
