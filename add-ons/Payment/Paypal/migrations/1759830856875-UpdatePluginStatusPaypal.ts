import { Plugins } from '../../../../src/api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class UpdatePluginStatusPaypal1759830856875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const paypalPlugin = await pluginRepository.findOne({ where: { slugName: 'paypal' } });
        if (paypalPlugin) {
            paypalPlugin.id = paypalPlugin.id;
        }
        paypalPlugin.pluginName = 'Paypal';
        paypalPlugin.pluginType = 'Payment';
        paypalPlugin.pluginStatus = 0;
        paypalPlugin.isEditable = 1;
        paypalPlugin.pluginTimestamp = 1759830856875;
        paypalPlugin.displayName = 'Paypal';
        paypalPlugin.slugName = 'paypal';
        paypalPlugin.pluginAdditionalInfo = '{"clientId":"AYmqapow9hk84axv3GjrNNFsMwsagQqdrsjwS_G_OfwR2WyDq1yMMQPM0mVh2FXR5-mktYYvf2SJGQTo","clientSecret":"EOOx_hJvgPBLktmMx-AoHOvws-XgSVXtMWndh_7f2ZUYCCPljWwUybgPWTJwo69CkwzUFVsFM9PWGe8I","processRoute":"/paypal-payment/process","successRoute":"/paypal-payment/success","cancelRoute":"/paypal-payment/cancel","failureRoute":"/paypal-payment/failure","isTest":true}';
        paypalPlugin.pluginFormInfo = '{"controls":[{"name":"clientId","label":"Client Id:","value":"","type":"text","validators":{"required":true}},{"name":"clientSecret","label":"Client Secret:","value":"","type":"text","validators":{"required":true}},{"name":"isTest","label":"Is Test:","value":"","type":"checkbox"}],"postRoute":"/paypal-payment"}';
        paypalPlugin.pluginAvatar = 'Img_1710850832892.png';
        paypalPlugin.pluginAvatarPath = 'logo/';
        await pluginRepository.save(paypalPlugin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
