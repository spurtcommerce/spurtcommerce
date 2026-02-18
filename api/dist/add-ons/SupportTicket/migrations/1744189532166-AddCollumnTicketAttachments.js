"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnTicketAttachments1744189532166 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCollumnTicketAttachments1744189532166 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cancellationTypeColumnExist = yield queryRunner.hasColumn('ticket_attachments', 'file_type');
            if (!cancellationTypeColumnExist) {
                yield queryRunner.query(`DELETE FROM ticket_attachments ;`);
                yield queryRunner.addColumn('ticket_attachments', new typeorm_1.TableColumn({
                    name: 'file_type',
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
exports.AddCollumnTicketAttachments1744189532166 = AddCollumnTicketAttachments1744189532166;
//# sourceMappingURL=1744189532166-AddCollumnTicketAttachments.js.map