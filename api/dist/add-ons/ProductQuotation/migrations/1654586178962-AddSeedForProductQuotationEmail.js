"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSeedForProductQuotationEmail1654586178962 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddSeedForProductQuotationEmail1654586178962 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const quotationData = '<p> Dear {name}, </p> <br/><br/>' + '<p style= margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px> Here is a new Quotation for your product {title} from customer -{customername}. </p>';
            const exist = yield queryRunner.query('SELECT * FROM `email_template` WHERE `id` = ' + '"22"');
            if (exist.length === 0) {
                const QuotationMailSeed = [
                    {
                        emailTemplateId: 22,
                        title: 'Quotation Request Mail',
                        subject: 'Product Quotation Request',
                        content: quotationData,
                        isActive: 1,
                    },
                ];
                yield (0, typeorm_1.getRepository)('EmailTemplate').save(QuotationMailSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddSeedForProductQuotationEmail1654586178962 = AddSeedForProductQuotationEmail1654586178962;
//# sourceMappingURL=1654586178962-AddSeedForProductQuotationEmail.js.map