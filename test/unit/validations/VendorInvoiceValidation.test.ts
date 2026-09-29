import { VendorInvoice } from '../../../src/api/core/models/VendorInvoice';
import { validate } from 'class-validator';

describe('VendorInvoice Validations', () => {

    test('VendorInvoice should succeed with all required field', async (done) => {
        // ---
        const vendorInvoiceData = new VendorInvoice();
        vendorInvoiceData.vendorInvoiceId = 1;
        vendorInvoiceData.orderId = 1;
        vendorInvoiceData.vendorId = 1;
        vendorInvoiceData.invoiceNo = 'in001';
        vendorInvoiceData.email = 'test@gmail.com';
        const errors = await validate(vendorInvoiceData);
        expect(0).toEqual(errors.length);
        done();
    });

   test('Should not validate VendorInvoice without vendorInvoiceId', async (done) => {
        // ---
        const vendorInvoiceData = new VendorInvoice();
        vendorInvoiceData.vendorId = 1;
        vendorInvoiceData.orderId = 1;
        vendorInvoiceData.invoiceNo = 'inv001';
        vendorInvoiceData.email = 'test@gmail.com';
        const errors = await validate(vendorInvoiceData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorInvoice without orderId', async (done) => {
        // ---
        const vendorInvoiceData = new VendorInvoice();
        vendorInvoiceData.vendorInvoiceId = 1;
        vendorInvoiceData.vendorId = 1;
        vendorInvoiceData.invoiceNo = 'inv001';
        vendorInvoiceData.email = 'test@gmail.com';
        const errors = await validate(vendorInvoiceData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorInvoice without vendorId', async (done) => {
        // ---
        const vendorInvoiceData = new VendorInvoice();
        vendorInvoiceData.vendorInvoiceId = 1;
        vendorInvoiceData.invoiceNo = 'inv001';
        vendorInvoiceData.orderId = 1;
        vendorInvoiceData.email = 'test@gmail.com';
        const errors = await validate(vendorInvoiceData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorInvoice without invoiceNo', async (done) => {
        // ---
        const vendorInvoiceData = new VendorInvoice();
        vendorInvoiceData.vendorInvoiceId = 1;
        vendorInvoiceData.vendorId = 1;
        vendorInvoiceData.orderId = 1;
        vendorInvoiceData.invoiceNo = '';
        vendorInvoiceData.email = 'test@gmail.com';
        const errors = await validate(vendorInvoiceData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorInvoice without email', async (done) => {
        // ---
        const vendorInvoiceData = new VendorInvoice();
        vendorInvoiceData.vendorInvoiceId = 1;
        vendorInvoiceData.vendorId = 1;
        vendorInvoiceData.orderId = 1;
        vendorInvoiceData.invoiceNo = 'in001';
        vendorInvoiceData.email = '';
        const errors = await validate(vendorInvoiceData);
        expect(1).toEqual(errors.length);
        done();
    });
});
