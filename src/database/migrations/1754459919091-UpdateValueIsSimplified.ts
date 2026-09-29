import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateValueIsSimplified1754459919091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('product', new TableColumn({
            name: 'is_specification',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.query(`UPDATE product
            SET is_specification = CASE
                WHEN is_simplified = 1 THEN 1
                ELSE 0
            END;`);

        await queryRunner.query(`UPDATE product
                SET is_simplified = 1
                WHERE is_simplified = 2`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
