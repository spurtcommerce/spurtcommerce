import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInPage1770628880291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // add link column
        await queryRunner.addColumn(
            'page',
            new TableColumn({
                name: 'link',
                type: 'varchar',
                length: '255',
                isNullable: true,
            })
        );

        // add position column
        await queryRunner.addColumn(
            'page',
            new TableColumn({
                name: 'position',
                type: 'int',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
