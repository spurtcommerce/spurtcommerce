"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnsSettingsTable1743163860003 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCollumnsSettingsTable1743163860003 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cancelTheresholdColumnExist = yield queryRunner.hasColumn('settings', 'order_cancel_status_id');
            if (!cancelTheresholdColumnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'order_cancel_status_id',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const cancellationTypeColumnExist = yield queryRunner.hasColumn('settings', 'cancellation_type');
            if (!cancellationTypeColumnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'cancellation_type',
                    type: 'tinyint',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const autoApproveColumnExist = yield queryRunner.hasColumn('settings', 'is_auto_approve_cancellation');
            if (!autoApproveColumnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'is_auto_approve_cancellation',
                    type: 'tinyint',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const sellerApprovalTimeframeUnitColumnExist = yield queryRunner.hasColumn('settings', 'seller_approval_timeframe_unit');
            if (!sellerApprovalTimeframeUnitColumnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'seller_approval_timeframe_unit',
                    type: 'enum',
                    enum: ['hours', 'days', 'weeks'],
                    isNullable: true,
                }));
            }
            const sellerApprovalTimeframeValueColumnExist = yield queryRunner.hasColumn('settings', 'seller_approval_timeframe_value');
            if (!sellerApprovalTimeframeValueColumnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'seller_approval_timeframe_value',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const productCancellableColumnExist = yield queryRunner.hasColumn('settings', 'is_product_cancellable');
            if (!productCancellableColumnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'is_product_cancellable',
                    type: 'tinyint',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddCollumnsSettingsTable1743163860003 = AddCollumnsSettingsTable1743163860003;
//# sourceMappingURL=1743163860003-AddCollumnsSettingsTable.js.map