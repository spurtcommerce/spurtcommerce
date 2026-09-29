import { MigrationInterface, QueryRunner } from 'typeorm';

export class VendorPluginSeedForTenantEleven1747222588221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const plugin: any = await queryRunner.manager.findOne('plugins', { where: { slugName: 'shopping-cart' } });

        if (plugin) {
            const vendor: any = await queryRunner.manager.findOne('vendor', { select: { vendorId: true }, where: { vendorId: 11 } });
            if (vendor) {
                await queryRunner.manager.save('vendor_plugin', {
                    vendorId: vendor.vendorId,
                    pluginId: plugin.id,
                });
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
