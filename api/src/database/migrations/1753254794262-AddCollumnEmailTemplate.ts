import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnEmailTemplate1753254794262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('email_template', new TableColumn({
            name: 'template_group',
            type: 'enum',
            enum: ['buyer', 'seller', 'fullfilled'],
            isNullable: true,
        }));

        await queryRunner.query(`
            UPDATE email_template SET template_group = 'buyer'
            WHERE id IN (1,4,5,20,21,24,31,32,40,41,49,58,59,60,61,63)
        `);
        await queryRunner.query(`
            UPDATE email_template SET template_group = 'seller'
            WHERE id IN (2,3,6,11,17,19,23,25,45,47,48,50,51,56,57,62)
        `);
        await queryRunner.query(`
            UPDATE email_template SET template_group = 'fullfilled'
            WHERE id IN (7,18)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
