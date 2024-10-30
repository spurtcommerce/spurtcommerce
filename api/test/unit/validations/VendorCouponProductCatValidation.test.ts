import { VendorCouponProductCategory } from '../../../src/api/core/models/VendorCouponProductCategory';
import { validate } from 'class-validator';

describe('VendorCouponProductCategory Validations', () => {

    test('VendorCouponProductCategory should succeed with all required field', async (done) => {
        // ---
        const vendorCoupon = new VendorCouponProductCategory();
        vendorCoupon.id = 1;
        vendorCoupon.vendorCouponId = 1;
        const errors = await validate(vendorCoupon);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCouponProductCategory without id', async (done) => {
        // ---
        const vendorCoupon = new VendorCouponProductCategory();
        vendorCoupon.vendorCouponId = 1;
        const errors = await validate(vendorCoupon);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCouponProductCategory without vendorCouponId', async (done) => {
        // ---
        const vendorCoupon = new VendorCouponProductCategory();
        vendorCoupon.id = 1;
        const errors = await validate(vendorCoupon);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
