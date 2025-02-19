"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnIsGuestCheckoutInSettings1718003184646 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnIsGuestCheckoutInSettings1718003184646 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield queryRunner.hasColumn('settings', 'is_guest_allowed'))) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'is_guest_allowed',
                    type: 'int',
                    length: '11',
                    comment: 'IS GUEST OPERATION ALLOWED IN APPLICATION FLAG',
                    isPrimary: false,
                    isNullable: true,
                }));
                const repo = (0, typeorm_1.getRepository)('Settings');
                const settings = yield repo.findOne({});
                if (settings) {
                    settings.isGuestAllowed = 1;
                    yield repo.save(settings);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnIsGuestCheckoutInSettings1718003184646 = AddColumnIsGuestCheckoutInSettings1718003184646;
//# sourceMappingURL=1718003184646-AddColumnIsGuestCheckoutInSettings.js.map