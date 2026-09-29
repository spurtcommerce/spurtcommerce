import chalk from 'chalk';
import { Logger } from '../../src/lib/logger';
import { env } from '../env';

export function banner(log: Logger): void {
    if (env.app.banner) {
        const route = () => `${env.app.schema}://${env.app.host}:${env.app.port}`;
        log.info(``);
        log.info(chalk.bold.white('Aloha 🚀 Your app is ready on:') + ' ' + chalk.green.underline(`${route()}${env.app.routePrefix}`));
        log.info(chalk.red('Press CTRL + C to stop the server.'));
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info(chalk.yellow(`Environment  : ${env.node}`));
        log.info(chalk.yellow(`Version      : ${env.app.version}`));
        // log.info(chalk.yellow('Database     : ') + chalk.bgBlue.black(` ${env.db.database} `));
        log.info(``);
        log.info(`🔗 API Info     : ${route()}${env.app.routePrefix}`);
        if (env.apidoc.enabled) {
            log.info(`📚 API DOC      : ${route()}${env.apidoc.route}`);
        }
        if (env.monitor.enabled) {
            log.info(`📊 Monitor      : ${route()}${env.monitor.route}`);
        }
        log.info('-------------------------------------------------------');
        log.info('');
    } else {
        log.info(`Application is up and running.`);
    }
}
