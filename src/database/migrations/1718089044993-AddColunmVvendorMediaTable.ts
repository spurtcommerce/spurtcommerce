import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColunmVvendorMediaTable1718089044993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor_media', 'url');
        if (!columnExist) {
            await queryRunner.addColumn('vendor_media', new TableColumn({
                name: 'url',
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
