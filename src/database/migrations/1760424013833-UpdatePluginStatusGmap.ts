import { Plugins } from '../../../src/api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdatePluginStatusGmap1760424013833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const gmapPlugin = await pluginRepository.findOne({ where: { slugName: 'gmap' } });
        if (gmapPlugin) {
            gmapPlugin.id = gmapPlugin.id;
        }
        gmapPlugin.pluginName = 'Gmap';
        gmapPlugin.pluginType = 'Gmap';
        gmapPlugin.pluginStatus = 0;
        gmapPlugin.isEditable = 0;
        gmapPlugin.pluginTimestamp = 1760424013833;
        gmapPlugin.displayName = 'Gmap';
        gmapPlugin.slugName = 'gmap';
        gmapPlugin.pluginAdditionalInfo = '{"clientId":"   ","clientSecret":"  ","defaultRoute":"/CustomerAddress/add-address","isTest":""}';
        gmapPlugin.pluginFormInfo = '{"controls":[{"name":"clientId","label":"Client Id:","value":"","type":"text","validators":{"required":true}},{"name":"clientSecret","label":"Client Secret:","value":"","type":"text","validators":{"required":true}},{"name":"isTest","label":"Is Test:","value":"","type":"checkbox"}],"postRoute":"/admin-gmap/update-setting"}';
        gmapPlugin.pluginAvatar = 'Img_1564575414973.png';
        gmapPlugin.pluginAvatarPath = '/logo';
        await pluginRepository.save(gmapPlugin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
