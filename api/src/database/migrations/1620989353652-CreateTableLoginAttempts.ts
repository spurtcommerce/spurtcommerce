import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableLoginAttempts1620989353652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'login_attempts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'customer_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'ip_address',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('login_attempts');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('login_attempts', true);
    }
}
