import { MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnsInSettings1793018313175 implements MigrationInterface {

      public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('settings');

        if (!table?.findColumnByName('site_category')) {
            await queryRunner.addColumn(
                'settings',
                new TableColumn({
                    name: 'site_category',
                    type: 'text',
                    isNullable: true,
                })
            );
        }

        if (!table?.findColumnByName('access_key')) {
            await queryRunner.addColumn(
                'settings',
                new TableColumn({
                    name: 'access_key',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                })
            );
        }

        await queryRunner.query(
            `UPDATE \`settings\`
             SET
                \`site_category\` = ?,
                \`access_key\` = ?
             WHERE \`settings_id\` = (
                SELECT \`settings_id\` FROM (
                    SELECT MIN(\`settings_id\`) AS settings_id
                    FROM \`settings\`
                ) AS s
             )`,
            [
                'craft-supplies,travel-and-luggage,art-and-collectibles,jewelry-and-accessories,food-and-beverages,toys-and-games,sports-and-outdoors,home-and-garden,packaging-and-paper,gifts-and-crafts,construction-and-real-estate1,mens-bottom-wear,electrical-and-electronics',
                '8097571064818418',
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('settings');

        if (table?.findColumnByName('access_key')) {
            await queryRunner.dropColumn('settings', 'access_key');
        }

        if (table?.findColumnByName('site_category')) {
            await queryRunner.dropColumn('settings', 'site_category');
        }
    }
}
