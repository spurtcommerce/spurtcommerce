"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailNotificationTemplate1720696823268 = void 0;
const tslib_1 = require("tslib");
const EmailTemplate_1 = require("../../api/core/models/EmailTemplate");
const typeorm_1 = require("typeorm");
class AddEmailNotificationTemplate1720696823268 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailTemplateService = yield (0, typeorm_1.getRepository)(EmailTemplate_1.EmailTemplate);
            const newEmailTemplate = new EmailTemplate_1.EmailTemplate();
            newEmailTemplate.emailTemplateId = 46;
            newEmailTemplate.title = 'Notify Inventory';
            newEmailTemplate.subject = 'Immediate Action Required: Product Running Low',
                newEmailTemplate.content = `<p>Dear {name},</p>

                                        <p>We wanted to inform you that your product, <b>{productName}</b>, is nearing the end of its available stock. To avoid any potential stockouts and to ensure continuous availability to our customers, we recommend replenishing your stock at the earliest..</p>`;
            newEmailTemplate.isActive = 1;
            newEmailTemplate.dynamicFieldsRef = `{name},{productName}`;
            yield emailTemplateService.save(newEmailTemplate);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddEmailNotificationTemplate1720696823268 = AddEmailNotificationTemplate1720696823268;
//# sourceMappingURL=1720696823268-AddEmailNotificationTemplate.js.map