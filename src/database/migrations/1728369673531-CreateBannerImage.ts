import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateBannerImage1728369673531 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_banner_images_banner_banner_id',
        columnNames: ['banner_id'],
        referencedColumnNames: ['banner_id'],
        referencedTableName: 'banner',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'banner_images',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'image_name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'image_path',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'is_primary',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'banner_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'int',
                    default: 1,
                    isNullable: true,
                },
                {
                    name: 'is_delete',
                    type: 'int',
                    default: 0,
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'modified_date',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'modified_by',
                    type: 'int',
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('banner_images');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const getTable = await queryRunner.getTable('banner_images');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('banner_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
