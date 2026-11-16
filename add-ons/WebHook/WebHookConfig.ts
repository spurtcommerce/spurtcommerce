import { getDataSource } from '../../src/loaders/typeormLoader';
import { Plugins } from '../../src/api/core/models/Plugin';
import * as path from 'path';
import { env } from '../../src/env';

let webHook;

export async function webHookInit(): Promise<any> {

    const webhookToken = process.env.WEBHOOK_TOKEN;
    if (!webhookToken || webhookToken.trim() === '') {
        const errorMessage = 'WEBHOOK_TOKEN environment variable is missing or empty. Webhook initialization failed.';
        console.error(`[WebHookConfig] ${errorMessage}`);
        throw new Error(errorMessage);
    }

    const webhooks = require('node-webhooks');

    const pluginRepository = getDataSource().getRepository(Plugins);

    const webHookUrlRegistrations = {};

    const PORT = env.app.port;

    const isPluginActive = await pluginRepository.findOne({ where: { slugName: 'webhook', pluginStatus: 1 } });

    if (isPluginActive) {
        const webHookEvents = require(path.join(process.cwd(), 'webHookConfig.json'));
        for (const event in webHookEvents) {
            if (webHookEvents[event].api) {
                webHookEvents[event].api = webHookEvents[event].api.replace('{{PORT}}', PORT.toString());
                webHookUrlRegistrations[event] = [webHookEvents[event].api];
            }
        }

    }

    const registerHooks = () => {
        return new webhooks({
            db: webHookUrlRegistrations,
        });
    };

    webHook = registerHooks();

    const emitter = webHook.getEmitter();

    emitter.on('*.success', (shortname: any, statusCode: any, body: any) => {
        console.log('Success on trigger webHook ' + shortname + ' with status code ', statusCode, 'and body ', body);
    });

    emitter.on('*.failure', (shortname: any, statusCode: any, body: any) => {
        console.error('Error on trigger webHook ' + shortname + ' with status code ', statusCode, 'and body', body);
    });
    // --
}

export async function trigger(event: string, params: any): Promise<void> {
    try {
        const webHookEvents = require(path.join(process.cwd(), 'webHookConfig.json'));
        if (!webHookEvents || !webHookEvents[event]) {
            return;
        }
        const webHookAuthToken = process.env.WEBHOOK_TOKEN;
        if (!webHookAuthToken || webHookAuthToken.trim() === '') {
            console.error(`[WebHookConfig] Cannot trigger webhook event "${event}": WEBHOOK_TOKEN environment variable is missing or empty.`);
            return;
        }
        if (webHook && typeof webHook.trigger === 'function') {
            webHook.trigger(
                event,
                { event, params },
                { authorization: `Bearer ${webHookAuthToken.trim()}` }
            );
        }
    } catch (err: any) {
        console.error(`[WebHookConfig] Error triggering webhook event "${event}":`, err.message);
    }
}
