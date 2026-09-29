import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddCollumnLoginAttemptsModelTable1749645395283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE login_attempts;`);

        await queryRunner.addColumn('login_attempts', new TableColumn({
            name: 'customer_user_id',
            type: 'int',
            isNullable: false,
        }));

        await queryRunner.createForeignKey(
            'login_attempts',
            new TableForeignKey({
                columnNames: ['customer_user_id'],
                referencedTableName: 'customer_users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'FK_customer_user_id_id_to_customer_users',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
