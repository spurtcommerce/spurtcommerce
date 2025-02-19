import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import path from 'path';
import { readdir } from 'fs/promises';
import { getConnection, In, Not } from 'typeorm';
import { Plugins } from '../api/core/models/Plugin';
import { Migrations } from '../api/core/models/Migrations';

export let pluginModule: string[] = [];

export const pluginLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings) => {
    // default/core plugin initialize here.....
    pluginModule.push('CashOnDelivery');
    pluginModule.push('gmap');
    pluginModule.push('gmail');
    pluginModule.push('facebook');
    // --
    const addOnPath = path.join(__dirname + '/../../add-ons');
    const pluginList: Array<Promise<void>> = (await readdir(addOnPath, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(async dirent => {
            const key = dirent.name;
            if (key === 'Oauth' || key === 'Payment') {
                const subPath = path.join(addOnPath, '/', key);
                const subPluginList: Array<Promise<void>> = (await readdir(subPath, { withFileTypes: true }))
                    .filter(subDirent => subDirent.isDirectory()).map(async subDirent => {
                        pluginModule.push(subDirent.name);
                    });
                await Promise.all(subPluginList);
            }
            pluginModule.push(key);
        });

    await Promise.all(pluginList);
    const pluginManager = getConnection().getRepository(Plugins);
    const migrations = getConnection().getRepository(Migrations);
    const PluginList = await pluginManager.find({
        pluginName: Not(In(pluginModule)),
    });
    const timestamp: number[] = PluginList.map((plugin) => plugin.pluginTimestamp);
    Promise.all(timestamp);
    if (timestamp?.length > 0) {
        await pluginManager.delete({
            pluginName: Not(In(pluginModule)),
        });
        await migrations.delete({
            timestamp: In(timestamp),
        });
    }
};
