import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdateBankDetailJsonColumn1717582654864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'bank_account');
        if (columnExist) {
            await getDataSource().getRepository('Vendor').update({}, {
                bankAccount: {
                    accountHolderName: '',
                    accountNumber: '',
                    branch: '',
                    ifsc: '',
                    bankName: '',
                    bic: '',
                    accountCreatedOn: '',
                    bankAddress1: '',
                    bankAddress2: '',
                    bankArea: '',
                    bankCity: '',
                    bankCountryId: '',
                    bankStateId: '',
                    bankPincode: '',
                },
            });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
