import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCopyRightsColumnInSettings1744979289113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isCopyRightsColumnExist = await queryRunner.hasColumn('settings', 'copyrights');
        if (!isCopyRightsColumnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'copyrights',
                type: 'text',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
