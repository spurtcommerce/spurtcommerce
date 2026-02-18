"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = banner;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const env_1 = require("../env");
function banner(log) {
    if (env_1.env.app.banner) {
        const route = () => `${env_1.env.app.schema}://${env_1.env.app.host}:${env_1.env.app.port}`;
        log.info(``);
        log.info(chalk_1.default.bold.white('Aloha 🚀 Your app is ready on:') + ' ' + chalk_1.default.green.underline(`${route()}${env_1.env.app.routePrefix}`));
        log.info(chalk_1.default.red('Press CTRL + C to stop the server.'));
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info(chalk_1.default.yellow(`Environment  : ${env_1.env.node}`));
        log.info(chalk_1.default.yellow(`Version      : ${env_1.env.app.version}`));
        log.info(``);
        log.info(`🔗 API Info     : ${route()}${env_1.env.app.routePrefix}`);
        if (env_1.env.apidoc.enabled) {
            log.info(`📚 API DOC      : ${route()}${env_1.env.apidoc.route}`);
        }
        if (env_1.env.monitor.enabled) {
            log.info(`📊 Monitor      : ${route()}${env_1.env.monitor.route}`);
        }
        log.info('-------------------------------------------------------');
        log.info('');
    }
    else {
        log.info(`Application is up and running.`);
    }
}
//# sourceMappingURL=banner.js.map