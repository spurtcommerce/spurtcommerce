import { MigrationInterface, QueryRunner, TableColumn, getRepository } from 'typeorm';

export class AddBankAccountDetailJsonColInVendorTable1717069088330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const columnExist = await queryRunner.hasColumn('vendor', 'bank_account');

        if (!columnExist) {
            await queryRunner.addColumn('vendor', new TableColumn(
                {
                    name: 'bank_account',
                    type: 'json',
                    isPrimary: false,
                    isNullable: true,
                }
            ));

            await getRepository('Vendor').update({}, {
                bankAccount: {
                    accountHolderName: '',
                    accountNumber: '',
                    branch: '',
                    ifsc: '',
                    bankName: '',
                    bic: '',
                    accountCreatedOn: '',
                },
            });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
