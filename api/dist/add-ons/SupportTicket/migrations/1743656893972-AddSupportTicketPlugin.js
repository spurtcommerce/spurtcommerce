"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSupportTicketPlugin1743656893972 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddSupportTicketPlugin1743656893972 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const supportTicketSeed = [
                {
                    pluginName: 'SupportTicket',
                    slugName: 'support-ticket',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'CMS',
                    pluginTimestamp: 1743656893972,
                    displayName: 'Support Ticket',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/support-ticket~,~/api/support-ticket/~,~/api/support-ticket/ticket-category~,~/api/support-ticket/ticket-category/~,~/api/support-ticket/ticket-logs~,~/api/vendor-support-ticket~,~/api/vendor-support-ticket/~,~/api/vendor-support-ticket/ticket-category~,~/api/customer-support-ticket~,~/api/customer-support-ticket/~,~/api/customer-support-ticket/ticket-category~',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').save(supportTicketSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddSupportTicketPlugin1743656893972 = AddSupportTicketPlugin1743656893972;
//# sourceMappingURL=1743656893972-AddSupportTicketPlugin.js.map