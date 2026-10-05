import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVendorUsersAvatarPath1791185872357 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE vendor_users
            SET avatar = 'spurtlogo2.jpg',
                avatar_path = 'ten0001/'
            WHERE tenant_id = 1
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE vendor_users
            SET avatar = NULL,
                avatar_path = NULL
            WHERE tenant_id = 1
        `);
    }

}
