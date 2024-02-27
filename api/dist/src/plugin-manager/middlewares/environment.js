"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const env_1 = require("../../env");
/**
 * GET /
 * Home page.
 */
let index = (req, res, next) => {
    const globalEnv = {
        node: env_1.env.node,
        isProduction: env_1.env.isProduction,
        isTest: env_1.env.isTest,
        isDevelopment: env_1.env.isDevelopment,
        app: {
            name: env_1.env.app.name,
            version: env_1.env.app.version,
            description: env_1.env.app.description,
            host: env_1.env.app.host,
            schema: env_1.env.app.schema,
            routePrefix: env_1.env.app.routePrefix,
            port: env_1.env.app.port,
        },
        appHost: env_1.env.app.schema + '://' + env_1.env.app.host + ':' + env_1.env.app.port + env_1.env.app.routePrefix,
    };
    console.log(globalEnv);
    next();
};
exports.index = index;
//# sourceMappingURL=environment.js.map