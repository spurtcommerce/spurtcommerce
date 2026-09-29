import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddVendorVerificationJsonValueToAllVendor1716353975812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const vendorRepo = await getDataSource().getRepository('Vendor');

        await vendorRepo.update({}, {
            verification: {
                policy: 0,
                email: 0,
                decision: 0,
                category: 0,
                document: 0,
                storeFront: 0,
                bankAccount: 0,
                paymentInfo: 0,
                companyDetail: 0,
                deliveryMethod: 0,
                subscriptionPlan: 0,
                distributionPoint: 0,
            },
            verificationDetailComment: [],
            verificationComment: [],
        });

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
