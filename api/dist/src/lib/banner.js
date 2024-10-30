"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
const env_1 = require("../env");
function banner(log) {
    if (env_1.env.app.banner) {
        const route = () => `${env_1.env.app.schema}://${env_1.env.app.host}:${env_1.env.app.port}`;
        log.info(``);
        log.info(`Aloha, your app is ready on ${route()}${env_1.env.app.routePrefix}`);
        log.info(`To shut it down, press <CTRL> + C at any time.`);
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info(`Environment  : ${env_1.env.node}`);
        log.info(`Version      : ${env_1.env.app.version}`);
        log.info(``);
        log.info(`API Info     : ${route()}${env_1.env.app.routePrefix}`);
        if (env_1.env.apidoc.enabled) {
            log.info(`Swagger      : ${route()}${env_1.env.apidoc.route}`);
        }
        if (env_1.env.monitor.enabled) {
            log.info(`Monitor      : ${route()}${env_1.env.monitor.route}`);
        }
        log.info('-------------------------------------------------------');
        log.info('');
    }
    else {
        log.info(`Application is up and running.`);
    }
}
exports.banner = banner;
//# sourceMappingURL=banner.js.map