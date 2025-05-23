import { Product } from '../../../src/api/core/models/ProductModel';
import { validate } from 'class-validator';

describe('ProductValidations', () => {

    test('Product should succeed with all required fields', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = 'test';
        product.price = 100;
        product.amount = 100;
        product.isActive = 1;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid id', async (done) => {
        // ---
        const product = new Product();
        product.sku = '001';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = 'test';
        product.price = 100;
        product.amount = 100;
        product.isActive = 1;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid product sku', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = 'test';
        product.price = 100;
        product.amount = 100;
        product.isActive = 1;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid quantity', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.stockStatusId = 1;
        product.image = 'test';
        product.price = 100;
        product.amount = 100;
        product.isActive = 1;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid stock status id', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.quantity = 1;
        product.image = 'test';
        product.price = 100;
        product.amount = 100;
        product.isActive = 1;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid product image', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = '';
        product.price = 100;
        product.amount = 100;
        product.isActive = 1;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product valid without price', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = 'test';
        product.amount = 100;
        product.isActive = 1;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid amount', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = 'test';
        product.price = 100;
        product.isActive = 1;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid isActive', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = 'test';
        product.price = 100;
        product.amount = 100;
        product.name = 'test';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid product name', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = 'test';
        product.price = 100;
        product.amount = 100;
        product.isActive = 1;
        product.name = '';
        product.width = '330';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Product without valid product image', async (done) => {
        // ---
        const product = new Product();
        product.productId = 1;
        product.sku = '001';
        product.quantity = 1;
        product.stockStatusId = 1;
        product.image = 'test';
        product.price = 100;
        product.amount = 100;
        product.isActive = 1;
        product.name = 'demo';
        product.width = '';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});
