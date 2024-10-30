"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginDisplayData1725368681950 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddPluginDisplayData1725368681950 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('plugins', 'display_name');
            if (columnExist) {
                const data = [
                    {
                        id: 1,
                        displayName: 'Cash On Delivery',
                    },
                    {
                        id: 2,
                        displayName: 'Promotional Widgets',
                    },
                    {
                        id: 3,
                        displayName: 'SEO',
                    },
                    {
                        id: 4,
                        displayName: 'Blogs',
                    },
                    {
                        id: 19,
                        displayName: 'Gmap',
                    },
                    {
                        id: 23,
                        displayName: 'Paypal',
                    },
                    {
                        id: 24,
                        displayName: 'Stripe',
                    },
                    {
                        id: 25,
                        displayName: 'Razorpay',
                    },
                    {
                        id: 26,
                        displayName: 'Facebook',
                    },
                    {
                        id: 27,
                        displayName: 'Gmail',
                    },
                    {
                        id: 29,
                        displayName: 'Product Attributes',
                    },
                    {
                        id: 30,
                        displayName: 'Product Quotation',
                    },
                    {
                        id: 31,
                        displayName: 'Related Products',
                    },
                    {
                        id: 32,
                        displayName: 'Product Variants',
                    },
                    {
                        id: 33,
                        displayName: 'Question And Answer',
                    },
                    {
                        id: 34,
                        displayName: 'Rating And Review',
                    },
                    {
                        id: 35,
                        displayName: 'Abandoned Cart',
                    },
                    {
                        id: 40,
                        displayName: 'Product QR',
                    },
                    {
                        id: 41,
                        displayName: 'Common Products',
                    },
                    {
                        id: 42,
                        displayName: 'Coupon',
                    },
                    {
                        id: 43,
                        displayName: 'Chat',
                    },
                    {
                        id: 42,
                        displayName: 'Coupon',
                    },
                    {
                        id: 44,
                        displayName: 'personalized pricing',
                    },
                    {
                        id: 45,
                        displayName: 'Web Hook (Tech Addon)',
                    },
                ];
                yield (0, typeorm_1.getRepository)('plugins').save(data);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPluginDisplayData1725368681950 = AddPluginDisplayData1725368681950;
//# sourceMappingURL=1725368681950-AddPluginDisplayData.js.map