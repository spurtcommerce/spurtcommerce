import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorTable1581675647556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('vendor', 'contact_person_name');
        if (!ifExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'contact_person_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
        const ifExist1 = await queryRunner.hasColumn('vendor', 'designation');
        if (!ifExist1) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'designation',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
        const ifExist2 = await queryRunner.hasColumn('vendor', 'company_address1');
        if (!ifExist2) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_address1',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
        const ifExist3 = await queryRunner.hasColumn('vendor', 'company_address2');
        if (!ifExist3) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_address2',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
        const ifExist4 = await queryRunner.hasColumn('vendor', 'company_city');
        if (!ifExist4) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_city',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
        const ifExist5 = await queryRunner.hasColumn('vendor', 'company_state');
        if (!ifExist5) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_state',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist6 = await queryRunner.hasColumn('vendor', 'company_country_id');
        if (!ifExist6) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_country_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist7 = await queryRunner.hasColumn('vendor', 'pincode');
        if (!ifExist7) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'pincode',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist8 = await queryRunner.hasColumn('vendor', 'company_mobile_number');
        if (!ifExist8) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_mobile_number',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist9 = await queryRunner.hasColumn('vendor', 'company_email_id');
        if (!ifExist9) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_email_id',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist10 = await queryRunner.hasColumn('vendor', 'company_website');
        if (!ifExist10) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_website',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist11 = await queryRunner.hasColumn('vendor', 'company_gst_number');
        if (!ifExist11) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_gst_number',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist12 = await queryRunner.hasColumn('vendor', 'company_pan_number');
        if (!ifExist12) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_pan_number',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist13 = await queryRunner.hasColumn('vendor', 'payment_information');
        if (!ifExist13) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'payment_information',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('vendor', 'contact_person_name');
        await queryRunner.dropColumn('vendor', 'company_address2');
        await queryRunner.dropColumn('vendor', 'company_address1');
        await queryRunner.dropColumn('vendor', 'company_city');
        await queryRunner.dropColumn('vendor', 'company_state');
        await queryRunner.dropColumn('vendor', 'company_country_id');
        await queryRunner.dropColumn('vendor', 'pincode');
        await queryRunner.dropColumn('vendor', 'company_mobile_number');
        await queryRunner.dropColumn('vendor', 'company_email_id');
        await queryRunner.dropColumn('vendor', 'company_website');
        await queryRunner.dropColumn('vendor', 'company_gst_number');
        await queryRunner.dropColumn('vendor', 'company_pan_number');
        await queryRunner.dropColumn('vendor', 'payment_information');

    }

}
