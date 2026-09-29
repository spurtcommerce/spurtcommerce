import { Plugins } from '../../../src/api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class EnableRelatedProductAddon1761818446529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const productRelated = await pluginRepository.findOne({ where: { slugName: 'product-related' } });
        if (productRelated) {
            productRelated.pluginStatus = 1;
            await pluginRepository.save(productRelated);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
