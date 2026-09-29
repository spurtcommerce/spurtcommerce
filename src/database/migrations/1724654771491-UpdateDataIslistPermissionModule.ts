import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDataIslistPermissionModule1724654771491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnCheck = await queryRunner.hasColumn('permission_module', 'is_listed');
        if (columnCheck) {
            await queryRunner.query(`UPDATE permission_module SET is_listed = ${1} WHERE  name LIKE '%List%'`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
