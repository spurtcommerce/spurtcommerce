import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddCollumnCustomerTable1749642512874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('customer_users', new TableColumn({
            name: 'last_login',
            type: 'datetime',
            isNullable: true,
        }));

        await queryRunner.addColumn('customer_users', new TableColumn({
            name: 'locked_on',
            type: 'varchar',
            isNullable: true,
        }));

        await queryRunner.query(`TRUNCATE TABLE customer_activity;`);

        await queryRunner.addColumn('customer_activity', new TableColumn({
            name: 'customer_user_id',
            type: 'int',
            isNullable: false,
        }));

        await queryRunner.createForeignKey(
            'customer_activity',
            new TableForeignKey({
                columnNames: ['customer_user_id'],
                referencedTableName: 'customer_users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'FK_customer_user_id_to_customer_users',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
