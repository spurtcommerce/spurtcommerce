"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductQrcodePlugin1694433986443 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddProductQrcodePlugin1694433986443 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const qrSeed = [
                {
                    pluginName: 'ProductQrCode',
                    slugName: 'product-qrcode',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'Catalog',
                    pluginTimestamp: 1694433986443,
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/qrCode/generate-qrcode~,~/api/qrCode/created-qrcode~,~/api/qrCode/delete-qr~,~/api/qrCode/download-qrimage/~,~/api/qrCode/qr-list~,~/api/qrCode/product-details/~,~/api/qrCode/detele-product/~,~/api/qrCode/product-list~',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(qrSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddProductQrcodePlugin1694433986443 = AddProductQrcodePlugin1694433986443;
//# sourceMappingURL=1694433986443-AddProductQrcodePlugin.js.map