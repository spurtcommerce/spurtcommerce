import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnNameToApikeyTAble1793771261160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
                    'api_key',
                    new TableColumn({
                        name: 'name',
                        type: 'varchar',
                        default: '',
                    })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
