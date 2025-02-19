import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddGenderDobColumnInCustomer1717068016458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist1 = await queryRunner.hasColumn('customer', 'gender');

        if (!columnExist1) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'gender',
                type: 'varchar',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist2 = await queryRunner.hasColumn('customer', 'dob');

        if (!columnExist2) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'dob',
                type: 'date',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
