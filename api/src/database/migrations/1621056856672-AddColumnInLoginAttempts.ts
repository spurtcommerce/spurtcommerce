import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInLoginAttempts1621056856672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist1 = await queryRunner.hasColumn('login_attempts', 'created_by');
        if (!ifExist1) {
        await queryRunner.addColumn('login_attempts', new TableColumn({
                name: 'created_by',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist2 = await queryRunner.hasColumn('login_attempts', 'created_date');
        if (!ifExist2) {
        await queryRunner.addColumn('login_attempts', new TableColumn({
                name: 'created_date',
                type: 'datetime',
                isPrimary: false,
                isNullable: true,
                default: 'CURRENT_TIMESTAMP',
            }));
        }
        const ifExist3 = await queryRunner.hasColumn('login_attempts', 'modified_by');
        if (!ifExist3) {
        await queryRunner.addColumn('login_attempts', new TableColumn({
                name: 'modified_by',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist4 = await queryRunner.hasColumn('login_attempts', 'modified_date');
        if (!ifExist4) {
        await queryRunner.addColumn('login_attempts', new TableColumn({
                name: 'modified_date',
                type: 'datetime',
                isPrimary: false,
                isNullable: true,
                default: 'CURRENT_TIMESTAMP',
            }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('login_attempts', 'created_by');
        await queryRunner.dropColumn('login_attempts', 'created_date');
        await queryRunner.dropColumn('login_attempts', 'modified_by');
        await queryRunner.dropColumn('login_attempts', 'modified_date');
    }
}
