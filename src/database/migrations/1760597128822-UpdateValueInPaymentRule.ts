import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';
import { Vendor } from '../../../src/api/core/models/Vendor';
import { PaymentRule } from '../../../src/api/core/models/PaymentRule';

export class UpdateValueInPaymentRule1760597128822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const vendorRepository = getDataSource().getRepository(Vendor);
        const paymentRuleRepository = getDataSource().getRepository(PaymentRule);

        const vendor = await vendorRepository.find({ where: { isActive: 1, isDelete: 0 } });

        for (const data of vendor) {
            let newPaymentRule = await paymentRuleRepository.findOne({ where: { tenantId: data.vendorId } });

            if (!newPaymentRule) {
                newPaymentRule = new PaymentRule();
            }
            newPaymentRule.name = 'Money Order';
            newPaymentRule.tenantId = data.vendorId;
            newPaymentRule.instructions = 'Please make the full payment via money order before order dispatch.';
            newPaymentRule.slug = 'money-order';
            newPaymentRule.paymentMethodId = 2;

            await paymentRuleRepository.save(newPaymentRule);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
