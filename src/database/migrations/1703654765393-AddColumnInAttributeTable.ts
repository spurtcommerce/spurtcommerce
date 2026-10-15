import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInAttributeTable1703654765393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist1 = await queryRunner.hasColumn('attribute', 'description');

        if (!columnExist1) {
            await queryRunner.addColumn('attribute', new TableColumn({
                name: 'description',
                type: 'text',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist2 = await queryRunner.hasColumn('attribute', 'label');

        if (!columnExist2) {
            await queryRunner.addColumn('attribute', new TableColumn({
                name: 'label',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist3 = await queryRunner.hasColumn('attribute', 'section_name');

        if (!columnExist3) {
            await queryRunner.addColumn('attribute', new TableColumn({
                name: 'section_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist4 = await queryRunner.hasColumn('attribute', 'default_value');

        if (!columnExist4) {
            await queryRunner.addColumn('attribute', new TableColumn({
                name: 'default_value',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
