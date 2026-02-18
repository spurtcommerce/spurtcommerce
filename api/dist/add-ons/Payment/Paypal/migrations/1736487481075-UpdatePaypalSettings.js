"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaypalSettings1736487481075 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../../src/loaders/typeormLoader");
class UpdatePaypalSettings1736487481075 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repository = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repository.findOne({
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
                yield repository.save(plugin);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdatePaypalSettings1736487481075 = UpdatePaypalSettings1736487481075;
//# sourceMappingURL=1736487481075-UpdatePaypalSettings.js.map