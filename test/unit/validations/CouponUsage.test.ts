import { CouponUsage } from '../../../src/api/core/models/CouponUsage';
import { validate } from 'class-validator';

describe('CouponUsageValidations', () => {

    test('CouponUsage should succeed with all required fields', async (done) => {
        // ---
        const couponUsage = new CouponUsage();
        couponUsage.couponUsageId = 1;
        couponUsage.couponId = 1;
        couponUsage.discountAmount = 100;
        const errors = await validate(couponUsage);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CouponUsage without valid id', async (done) => {
        // ---
        const couponUsage = new CouponUsage();
        couponUsage.couponId = 1;
        couponUsage.discountAmount = 100;
        const errors = await validate(couponUsage);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CouponUsage without valid coupon id', async (done) => {
        // ---
        const couponUsage = new CouponUsage();
        couponUsage.couponUsageId = 1;
        couponUsage.discountAmount = 100;
        const errors = await validate(couponUsage);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CouponUsage without discount amount', async (done) => {
        // ---
        const couponUsage = new CouponUsage();
        couponUsage.couponUsageId = 1;
        couponUsage.couponId = 1;
        const errors = await validate(couponUsage);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
