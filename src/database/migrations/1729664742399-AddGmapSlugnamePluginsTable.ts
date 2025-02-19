import { Plugins } from '../../common/entities-index';
import { getRepository, IsNull, MigrationInterface, QueryRunner } from 'typeorm';

export class AddGmapSlugnamePluginsTable1729664742399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifGmapSlugName = await getRepository(Plugins).findOne({
            where: {
                id: 19,
                pluginName: 'gmap',
                slugName: IsNull(),
            },
        });
        if (ifGmapSlugName) {
            ifGmapSlugName.slugName = 'gmap';
            await getRepository(Plugins).save(ifGmapSlugName);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
