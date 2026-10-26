import { Plugins } from '../../../../src/api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class UpdatePluginStatusStripe1759831597774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const stripePlugin = await pluginRepository.findOne({ where: { slugName: 'stripe' } });
        if (stripePlugin) {
            stripePlugin.id = stripePlugin.id;
        }
        stripePlugin.pluginName = 'Stripe';
        stripePlugin.pluginType = 'Payment';
        stripePlugin.pluginStatus = 0;
        stripePlugin.isEditable = 1;
        stripePlugin.pluginTimestamp = 1759831597774;
        stripePlugin.displayName = 'Stripe';
        stripePlugin.slugName = 'stripe';
        stripePlugin.pluginAdditionalInfo = '{"clientId":"pk_test_51N0dyFSCXMNAcb3PxWNNrqS0GJk7fzETgex275j9D1dBPVrQpDuk0K1ugxqn9kkGAnPYm1y1btOIQY6aCTewoGEp00jvcMy032","clientSecret":"sk_test_51N0dyFSCXMNAcb3PnWS3GBkc9GT1lcDDOYKNXsMuIfwAaiy0QgGgu0JROxbUJ246r3J0O1NgqQsPywcJstFGYped00dQCT3fd6","processRoute":"/stripe-payment/process","successRoute":"/stripe-payment/success","cancelRoute":"/stripe-payment/cancel","failureRoute":"/stripe-payment/failure","isTest":true}';
        stripePlugin.pluginFormInfo = '{"controls":[{"name":"clientId","label":"Client Id:","value":"","type":"text","validators":{"required":true}},{"name":"clientSecret","label":"Client Secret:","value":"","type":"text","validators":{"required":true}},{"name":"isTest","label":"Is Test:","value":"","type":"checkbox"}],"postRoute":"/admin-stripe-payment/update-setting"}';
        stripePlugin.pluginAvatar = 'Img_1710850837730.png';
        stripePlugin.pluginAvatarPath = 'logo/';
        await pluginRepository.save(stripePlugin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
