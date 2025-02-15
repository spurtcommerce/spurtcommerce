import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDocumentPermissionModule1732687359333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM permission_module WHERE module_id IN (176, 177, 178);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
