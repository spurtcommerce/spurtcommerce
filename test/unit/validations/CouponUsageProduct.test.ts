import { CouponUsageProduct } from '../../../src/api/core/models/CouponUsageProduct';
import { validate } from 'class-validator';

describe('CouponUsageProductValidations', () => {

    test('CouponUsageProduct should succeed with all required fields', async (done) => {
        // ---
        const couponUsageProduct = new CouponUsageProduct();
        couponUsageProduct.id = 1;
        couponUsageProduct.customerId = 1;
        couponUsageProduct.orderId = 1;
        const errors = await validate(couponUsageProduct);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CouponUsageProduct without valid id', async (done) => {
        // ---
        const couponUsageProduct = new CouponUsageProduct();
        couponUsageProduct.customerId = 1;
        couponUsageProduct.orderId = 1;
        const errors = await validate(couponUsageProduct);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CouponUsageProduct without valid customer id', async (done) => {
        // ---
        const couponUsageProduct = new CouponUsageProduct();
        couponUsageProduct.id = 1;
        couponUsageProduct.orderId = 1;
        const errors = await validate(couponUsageProduct);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CouponUsageProduct without valid order id', async (done) => {
        // ---
        const couponUsageProduct = new CouponUsageProduct();
        couponUsageProduct.id = 1;
        couponUsageProduct.orderId = 1;
        const errors = await validate(couponUsageProduct);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
