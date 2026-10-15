import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddSpecificationTypeInPlugin1716462022415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const pluginRepo = getDataSource().getRepository('Plugins');

        const specificationPlugin: any = await pluginRepo.findOne({ where: { slugName: 'product-attribute' } });

        if (specificationPlugin) {

            specificationPlugin.pluginAdditionalInfo = `{ "isSimplified": 1 }`;
            specificationPlugin.isEditable = 1;

            await pluginRepo.save(specificationPlugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
