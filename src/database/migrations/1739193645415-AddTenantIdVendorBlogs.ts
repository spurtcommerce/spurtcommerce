import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddTenantIdVendorBlogs1739193645415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('blog_category', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false,
        }));

        await queryRunner.addColumn('blog', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
