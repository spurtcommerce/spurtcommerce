import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWebHookTable1714025757863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const tableExist = await queryRunner.hasTable('webhook');

        if (!tableExist) {

            const table = new Table({
                name: 'webhook',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'url',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'tinyint',
                        isPrimary: false,
                        isNullable: false,
                        default: '1',
                    },
                ],
            });

            await queryRunner.createTable(table);

        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
