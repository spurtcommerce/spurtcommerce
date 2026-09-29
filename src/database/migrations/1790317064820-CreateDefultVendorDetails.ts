import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';

export class CreateDefultVendorDetails1790317064820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const email = 'community@spurtcart.com';
        const password = 'Demo1234';
        const firstName = 'community';
        const lastName = 'spurtcart';
        const companyName = 'community';
        const customerGroupId = 1;
        const siteId = 2;
        const industryId = 4;
        const existingCustomer: any[] = await queryRunner.query(
            `SELECT id FROM customer WHERE email = ? AND delete_flag = 0 LIMIT 1`,
            [email]
        );
        if (existingCustomer.length > 0) {
            console.log(`Default vendor already exists with email: ${email}`);
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await queryRunner.query(
            `
            INSERT INTO customer (
                        first_name,
                        last_name,
                        customer_group_id,
                        username,
                        password,
                        email,
                        is_active,
                        delete_flag,
                        site_id,
                        is_vendor
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                firstName,
                lastName,
                customerGroupId,
                email,
                hashedPassword,
                email,
                1,
                0,
                siteId,
                1,
            ]
        );

        // Get newly created customer ID
        const customerResult: any[] = await queryRunner.query(
            `SELECT id FROM customer WHERE email = ? AND delete_flag = 0 LIMIT 1`,
            [email]
        );

        const customerId = customerResult[0].id;
        const vendorSlugName = companyName
            .replace(/\s+/g, '-')
            .replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '')
            .toLowerCase();

        await queryRunner.query(
            `
            INSERT INTO vendor
            (
                customer_id,
                industry_id,
                company_name,
                company_email_id,
                vendor_slug_name,
                approval_flag,
                is_active,
                is_delete,
                verification,
                verification_comment,
                verification_detail_comment,
                personalized_settings,
                app_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                customerId,
                industryId,
                companyName,
                email,
                vendorSlugName,
                1,
                1,
                0,
                JSON.stringify({
                    policy: 0,
                    email: 1,
                    decision: 0,
                    category: 0,
                    document: 0,
                    storeFront: 0,
                    bankAccount: 0,
                    paymentInfo: 0,
                    companyDetail: 0,
                    deliveryMethod: 0,
                    subscriptionPlan: 0,
                    distributionPoint: 0,
                }),
                JSON.stringify([]),
                JSON.stringify([]),
                JSON.stringify({
                    defaultLanguageId: 0,
                    storeSecondaryLanguageId: 0,
                    timeFormat: '',
                    timeZone: 'Asia/Kolkata',
                    dateFormat: '',
                }),
                `sp_83a960b9639e474d98af`,
            ]
        );

        // Get newly created vendor ID
        const vendorResult: any[] = await queryRunner.query(
            `
            SELECT vendor_id
            FROM vendor
            WHERE customer_id = ?
            LIMIT 1
            `,
            [customerId]
        );

        const vendorId = vendorResult[0].vendor_id;
        const stringPad = String(vendorId).padStart(4, '0');
        const vendorPrefixId = `Ten${stringPad}`;

        await queryRunner.query(
            `
            UPDATE vendor
            SET vendor_prefix_id = ?
            WHERE vendor_id = ?
            `,
            [vendorPrefixId, vendorId]
        );
        await queryRunner.query(
            `
            INSERT INTO vendor_user_group
            (
                name,
                slug,
                is_active,
                tenant_id
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                'Admin',
                'admin',
                1,
                vendorId,
            ]
        );

        // Get Admin Group ID
        const groupResult: any[] = await queryRunner.query(
            `
            SELECT id
            FROM vendor_user_group
            WHERE tenant_id = ?
              AND slug = 'admin'
            ORDER BY id DESC
            LIMIT 1
            `,
            [vendorId]
        );

        const vendorUserGroupId = groupResult[0].id;
        await queryRunner.query(
            `
            INSERT INTO vendor_users
            (
                user_group_id,
                username,
                password,
                first_name,
                last_name,
                email,
                is_active,
                delete_flag,
                tenant_id,
                is_super_vendor
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                vendorUserGroupId,
                email,
                hashedPassword,
                firstName,
                lastName,
                email,
                1,
                0,
                vendorId,
                1,
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const email = 'community@spurtcart.com';

        // Find vendor user
        const vendorUserResult: any[] = await queryRunner.query(
            `
            SELECT tenant_id
            FROM vendor_users
            WHERE email = ?
            LIMIT 1
            `,
            [email]
        );

        if (vendorUserResult.length === 0) {
            return;
        }

        const vendorId = vendorUserResult[0].tenant_id;

        // Find customer
        const customerResult: any[] = await queryRunner.query(
            `
            SELECT id
            FROM customer
            WHERE email = ?
            LIMIT 1
            `,
            [email]
        );

        const customerId = customerResult.length
            ? customerResult[0].id
            : null;

        // Delete vendor user
        await queryRunner.query(
            `
            DELETE FROM vendor_users
            WHERE email = ?
            `,
            [email]
        );

        // Delete vendor user group
        await queryRunner.query(
            `
            DELETE FROM vendor_user_group
            WHERE tenant_id = ?
            AND slug = 'admin'
            `,
            [vendorId]
        );

        // Delete vendor
        await queryRunner.query(
            `
            DELETE FROM vendor
            WHERE vendor_id = ?
            `,
            [vendorId]
        );

        // Delete customer
        if (customerId) {
            await queryRunner.query(
                `
                DELETE FROM customer
                WHERE id = ?
                `,
                [customerId]
            );
        }
        console.log('Default vendor removed successfully');
    }
}
