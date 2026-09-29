import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForignKeyCustomerUserToGroup1749619030736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'customer_users',
            new TableForeignKey({
                columnNames: ['customer_user_group_id'],
                referencedTableName: 'customer_user_group',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'FK_customer_user_group_id_to_customer_user_group',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
