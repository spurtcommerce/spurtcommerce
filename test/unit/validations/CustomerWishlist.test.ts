import { CustomerWishlist } from '../../../src/api/core/models/CustomerWishlist';
import { validate } from 'class-validator';

describe('CustomerWishlistValidations', () => {

    test('CustomerWishlist should succeed with all required fields', async (done) => {
        // ---
        const customerWishlist = new CustomerWishlist();
        customerWishlist.wishlistProductId = 1;
        customerWishlist.customerId = 1;
        customerWishlist.productId = '1';
        const errors = await validate(customerWishlist);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerWishlist without valid id', async (done) => {
        // ---
        const customerWishlist = new CustomerWishlist();
        customerWishlist.customerId = 1;
        customerWishlist.productId = '1';
        const errors = await validate(customerWishlist);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerWishlist without valid customer id', async (done) => {
        // ---
        const customerWishlist = new CustomerWishlist();
        customerWishlist.wishlistProductId = 1;
        customerWishlist.productId = '1';
        const errors = await validate(customerWishlist);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerWishlist without valid product id', async (done) => {
        // ---
        const customerWishlist = new CustomerWishlist();
        customerWishlist.wishlistProductId = 1;
        customerWishlist.customerId = 1;
        customerWishlist.productId = '';
        const errors = await validate(customerWishlist);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
