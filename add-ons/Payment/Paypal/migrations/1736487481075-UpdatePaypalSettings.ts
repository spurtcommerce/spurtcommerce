import {MigrationInterface, QueryRunner} from 'typeorm';
import { Plugins } from '../../../../src/api/core/models/Plugin';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class UpdatePaypalSettings1736487481075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repository = getDataSource().getRepository(Plugins);
        const plugin = await repository.findOne({
            where: {
                pluginName: 'Paypal',
            },
        });

        const pluginFormInfo = {
            controls: [
                {
                    name: 'clientId',
                    label: 'Client Id:',
                    value: '',
                    type: 'text',
                    validators: {
                        required: true,
                    },
                },
                {
                    name: 'clientSecret',
                    label: 'Client Secret:',
                    value: '',
                    type: 'text',
                    validators: {
                        required: true,
                    },
                },
                {
                    name: 'isTest',
                    label: 'Is Test:',
                    value: '',
                    type: 'checkbox',
                },
            ],
            postRoute: '/paypal-payment',
        };

        if (plugin) {
            plugin.pluginFormInfo = JSON.stringify(pluginFormInfo);
            await repository.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
