import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColorCode1772090512237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            UPDATE order_status SET color_code = '#F59E0B' WHERE name = 'Awaiting Confirmation';
        `);

        await queryRunner.query(`
            UPDATE order_status SET color_code = '#2563EB' WHERE name = 'Confirmed';
        `);

        await queryRunner.query(`
            UPDATE order_status SET color_code = '#7C3AED' WHERE name = 'Dispatched';
        `);

        await queryRunner.query(`
            UPDATE order_status SET color_code = '#16A34A' WHERE name = 'Delivered';
        `);

        await queryRunner.query(`
            UPDATE order_status SET color_code = '#6B7280' WHERE name = 'Closed';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
