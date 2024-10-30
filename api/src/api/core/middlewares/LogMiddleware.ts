/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as express from 'express';
import morgan from 'morgan';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import { env } from '../../../env';
import { Logger } from '../../../lib/logger';

@Middleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {

    private log = new Logger(__dirname);

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return morgan(env.log.output, {
            stream: {
                write: this.log.info.bind(this.log),
            },
        })(req, res, next);
    }

}
