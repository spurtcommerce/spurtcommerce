import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSeoInVendorTable1739532231715 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('vendor', [
            new TableColumn({
                name: 'meta_title',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
            new TableColumn({
                name: 'meta_tag_description',
                type: 'text',
                isNullable: true,
            }),
            new TableColumn({
                name: 'meta_tag_keyword',
                type: 'text',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
