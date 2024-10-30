import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class UpdateBankDetailJsonColumn1717582654864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'bank_account');
        if (columnExist) {
            await getRepository('Vendor').update({}, {
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
