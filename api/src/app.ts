/*
 * spurtcommerce API
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';
import { banner } from './lib/banner';
import { Logger } from './lib/logger';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { expressLoader } from './loaders/expressLoader';
import { homeLoader } from './loaders/homeLoader';
import { iocLoader } from './loaders/iocLoader';
import { monitorLoader } from './loaders/monitorLoader';
import { publicLoader } from './loaders/publicLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';

/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * This is a boilerplate for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 */
const log = new Logger(__filename);

bootstrapMicroframework({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [
        winstonLoader,
        iocLoader,
        eventDispatchLoader,
        typeormLoader,
        expressLoader,
        monitorLoader,
        homeLoader,
        publicLoader,
       ],
    })
    .then(() => banner(log))
    .catch(error => log.error('Application is crashed: ' + error));
