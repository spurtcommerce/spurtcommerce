import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from 'typeorm';

export class AddIndustryIdInVendorTable1717065236250 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_vendor_industry_industry_id',
        columnNames: ['industry_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'industry',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor', 'industry_id');
        if (!ifExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'industry_id',
                type: 'int',
                isPrimary: false,
                isNullable: true,
            }));
        }
        await queryRunner.query('UPDATE vendor SET industry_id = 1');
        await queryRunner.query('ALTER TABLE `vendor` MODIFY COLUMN `industry_id` int not null');

        const getTable = await queryRunner.getTable('vendor');

        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('industry_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
