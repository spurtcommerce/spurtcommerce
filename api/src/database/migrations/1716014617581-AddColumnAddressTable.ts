import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnAddressTable1716014617581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('address', 'landmark');
        if (!ifExist) {
            await queryRunner.addColumn('address', new TableColumn({
                name: 'landmark',
                type: 'varchar',
                length: '100',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
