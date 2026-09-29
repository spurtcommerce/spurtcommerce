import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddTriggerFunctionsForProductHighlights1718187816848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TRIGGER before_product_insert
            BEFORE INSERT ON product
            FOR EACH ROW
            BEGIN
                IF NEW.product_highlights IS NULL THEN
                    SET NEW.product_highlights = '[]';
                END IF;
            END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS before_product_insert;
        `);
    }

}
