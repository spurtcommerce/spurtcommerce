import { getRepository } from 'typeorm';
import { Plugins } from '../../src/api/core/models/Plugin';
import * as path from 'path';

let webHook;

export async function webHookInit(): Promise<any> {

    const webhooks = require('node-webhooks');

    const pluginRepository = getRepository(Plugins);

    const webHookUrlRegistrations = {};

    const isPluginActive = await pluginRepository.findOne({ where: { slugName: 'webhook', pluginStatus: 1 } });

    if (isPluginActive) {
        const webHookEvents = require(path.join(process.cwd(), 'webHookConfig.json'));
        for (const event in webHookEvents) {
            if (true) {
                webHookUrlRegistrations[event] = webHookEvents[event].api ? [webHookEvents[event].api] : [];
            }
        }

    }

    console.log(webHookUrlRegistrations);

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
    const webHookEvents = require(path.join(process.cwd(), 'webHookConfig.json'));
    const webHookAuthToken = webHookEvents[event].token ?? '';
    webHook.trigger(
        event,
        { event, params },
        { authorization: `Basic ${webHookAuthToken}` }
    );
}
