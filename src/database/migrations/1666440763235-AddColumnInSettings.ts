import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInSettings1666440763235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('settings', 'addons');
        if (!ifExist) {
        await queryRunner.addColumn('settings', new TableColumn({
                name: 'addons',
                type: 'TEXT',
                isPrimary: false,
                isNullable: true,
        }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
