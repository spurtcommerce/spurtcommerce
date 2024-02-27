"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbandonedCartMailTemplate1689683250355 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const EmailTemplate_1 = require("../../../src/api/core/models/EmailTemplate");
class AbandonedCartMailTemplate1689683250355 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const templateSeed = [
                {
                    emailTemplateId: 30,
                    title: 'Abandoned Cart Content',
                    subject: 'Spurt Cart - hey, you have forgotten the items in your Cart !!!',
                    content: `Dear {name},<br/><br/><p  style='margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px'>We noticed that you recently visited our online store and added some items to your shopping cart. But, it seems like you haven't completed your purchase yet. We wanted to remind you on what you left behind and offer some assistance.<br/><br/>Here's your cart details:<br/>Product 1 - Title and Price<br/>[Product 2] - Title and Price<br/>[Product 3] - Title and Price<br/><br/><br/>If you have any questions about the products, need assistance with the checkout process, or require more information, our customer support team is here to help. Feel free to reach out to us via email at (support email) or call us directly at (support number). We will be happy to provide any assistance. <br/><br/><br/>Click on the following link to return to your shopping cart and complete your purchase.<br/><br/>Thank you for shopping with us !!!<br/><br/> </p>`,
                    isActive: 1,
                    dynamicFieldsRef: '{name}',
                },
            ];
            const ifTemplate = yield (0, typeorm_1.getRepository)(EmailTemplate_1.EmailTemplate).findOne(30);
            if (!ifTemplate) {
                yield (0, typeorm_1.getRepository)(EmailTemplate_1.EmailTemplate).save(templateSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AbandonedCartMailTemplate1689683250355 = AbandonedCartMailTemplate1689683250355;
//# sourceMappingURL=1689683250355-AbandonedCartMailTemplate.js.map