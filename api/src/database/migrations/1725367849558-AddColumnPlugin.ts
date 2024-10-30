import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnPlugin1725367849558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('plugins', 'display_name');
        if (!columnExist) {
            await queryRunner.addColumn('plugins', new TableColumn({
                name: 'display_name',
                type: 'varchar',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
