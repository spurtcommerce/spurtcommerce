"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderCancellationEmailTemplate1744017287521 = void 0;
const tslib_1 = require("tslib");
class CreateOrderCancellationEmailTemplate1744017287521 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`INSERT INTO email_template
                (shortname,subject,message,dynamic_fields_ref)
                VALUES
                ('Product Cancellation by Buyer',
                'Order Cancellation Request from Buyer',
                'Dear {sellerName},<br/><br/>
                <p style="margin-bottom:.5em; margin: 0 0 10px 0; text-indent: 50px">The buyer has requested to cancel the ordered product: <strong>{productName}</strong>. Please review and respond to the cancellation request.</p>',
                '{sellerName},{productName}');`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateOrderCancellationEmailTemplate1744017287521 = CreateOrderCancellationEmailTemplate1744017287521;
//# sourceMappingURL=1744017287521-CreateOrderCancellationEmailTemplate.js.map