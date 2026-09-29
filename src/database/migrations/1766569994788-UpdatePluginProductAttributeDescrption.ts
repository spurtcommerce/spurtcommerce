import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePluginProductAttributeDescrption1766569994788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE plugins
            SET
                description  = 'Manage how you can show the Product Specifications (Attributes) in Store Front by Enabling the Simple/Advanced menu.
Simple show a single row of product specification while the Advance menu shows multiple rows of product specifications'
            WHERE plugin_name = 'ProductAttribute'
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
