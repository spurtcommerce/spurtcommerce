import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderCancellationEmailTemplate1744017287521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`INSERT INTO email_template
                (shortname,subject,message,dynamic_fields_ref)
                VALUES
                ('Product Cancellation by Buyer',
                'Order Cancellation Request from Buyer',
                'Dear {sellerName},<br/><br/>
                <p style="margin-bottom:.5em; margin: 0 0 10px 0; text-indent: 50px">The buyer has requested to cancel the ordered product: <strong>{productName}</strong>. Please review and respond to the cancellation request.</p>',
                '{sellerName},{productName}');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
