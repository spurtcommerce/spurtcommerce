import { Plugins } from '../../../../src/api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class UpdatePluginStatusRazorpay1759831248027 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const RazorpayPlugin = await pluginRepository.findOne({ where: { slugName: 'razorpay' } });
        if (RazorpayPlugin) {
            RazorpayPlugin.id = RazorpayPlugin.id;
        }
        RazorpayPlugin.pluginName = 'Razorpay';
        RazorpayPlugin.pluginType = 'Payment';
        RazorpayPlugin.pluginStatus = 0;
        RazorpayPlugin.isEditable = 1;
        RazorpayPlugin.pluginTimestamp = 1759831248027;
        RazorpayPlugin.displayName = 'Razorpay';
        RazorpayPlugin.slugName = 'razorpay';
        RazorpayPlugin.pluginAdditionalInfo = '{"clientId":"rzp_test_qyHZwt4O4Eflkh","clientSecret":"TPbIsCYcRjDyfqnakkTZ8wee","processRoute":"/razorpay-payment/process","successRoute":"/razorpay-payment/success","cancelRoute":"/razorpay-payment/cancel","failureRoute":"/razorpay-payment/failure","isTest":true}';
        RazorpayPlugin.pluginFormInfo = '{"controls":[{"name":"clientId","label":"Client Id:","value":"","type":"text","validators":{"required":true}},{"name":"clientSecret","label":"Client Secret:","value":"","type":"text","validators":{"required":true}},{"name":"isTest","label":"Is Test:","value":"","type":"checkbox"}],"postRoute":"/admin-razor-pay-payment/update-setting"}';
        RazorpayPlugin.pluginAvatar = 'Img_1710850843554.png';
        RazorpayPlugin.pluginAvatarPath = 'logo/';
        await pluginRepository.save(RazorpayPlugin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
