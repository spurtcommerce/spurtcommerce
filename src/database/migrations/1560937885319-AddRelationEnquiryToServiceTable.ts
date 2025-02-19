import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddRelationEnquiryToServiceTable1560937885319 implements MigrationInterface {
    private serviceToEnquiryForeignKeys = new TableForeignKey({
        name: 'fk_tbl_service_enquiry_tbl_service',
        columnNames: ['service_id'],
        referencedColumnNames: ['service_id'],
        referencedTableName: 'service',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('service_enquiry');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.serviceToEnquiryForeignKeys);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('service_enquiry');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.serviceToEnquiryForeignKeys);
        }
    }
}
