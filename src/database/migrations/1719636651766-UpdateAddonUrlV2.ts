import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdateAddonUrlV21719636651766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getDataSource().getRepository('Plugins');
        const plugin: any = await repo.findOne({
            where: {
                slugName: 'product-attribute',
            },
        });

        if (plugin) {
            plugin.routes = plugin.routes + `,~/api/specification/v2~`;
            await repo.save(plugin);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
