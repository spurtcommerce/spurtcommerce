import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnIsVendor1749622600781 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('customer', new TableColumn({
            name: 'is_vendor',
            type: 'tinyint',
            isNullable: true,
        }));

        await queryRunner.query(`
          UPDATE customer
          SET is_vendor = CASE
            WHEN tenant_id IS NULL THEN 1
            ELSE 0
          END;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
