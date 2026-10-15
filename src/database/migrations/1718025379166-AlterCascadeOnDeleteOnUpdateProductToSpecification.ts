import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterCascadeOnDeleteOnUpdateProductToSpecification1718025379166 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_prd_to_spec_product_product_id',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_prd_to_spec_spec_specification_id',
        columnNames: ['specification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'specification',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

    });

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('product_to_specification', 'fk_prd_to_spec_product_product_id');
        await queryRunner.dropForeignKey('product_to_specification', 'fk_prd_to_spec_spec_specification_id');

        await queryRunner.createForeignKey('product_to_specification', this.tableForeignKey);
        await queryRunner.createForeignKey('product_to_specification', this.tableForeignKey2);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
