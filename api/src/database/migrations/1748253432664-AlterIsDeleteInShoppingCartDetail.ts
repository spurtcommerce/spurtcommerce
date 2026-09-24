import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterIsDeleteInShoppingCartDetail1748253432664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'shopping_cart_detail',
            'is_delete',
            new TableColumn({
                name: 'is_delete',
                type: 'boolean',
                isNullable: true,
                default: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
