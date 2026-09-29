import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddSiteMapPluginUrl1729849370507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getDataSource().getRepository('Plugins');
        const plugin: any = await repo.findOne({
            where: {
                slugName: 'seo',
            },
        });
        if (plugin) {
            plugin.routes = plugin.routes + `,~/api/site-map~,~/api/site-map/~,~/api/site-map/get-sitemap~`;
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
