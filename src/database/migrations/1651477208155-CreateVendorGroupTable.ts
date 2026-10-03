import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateVendorGroupTable1651477208155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'vendor_group',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'description',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('vendor_group');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('vendor_group');
    }
}
