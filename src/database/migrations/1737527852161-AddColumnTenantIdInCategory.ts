import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnTenantIdInCategory1737527852161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('category', new TableColumn({
            name: 'tenant_id',
            type: 'int',  // You can adjust the type if necessary (e.g., 'varchar', 'int', etc.)
            isNullable: false,  // You can change this depending on whether the column can be null
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('category', 'tenant_id');
    }
}
