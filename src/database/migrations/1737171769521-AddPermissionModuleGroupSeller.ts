import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPermissionModuleGroupSeller1737171769521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO permission_module_group
                                (module_group_id,name,slug_name,sort_order,created_date,modified_date)
                                VALUES
                                (60,'buyer-address','buyer-address',67,'2021-08-04 12:19:57','2021-08-04 12:19:57'),
                                (69,'Common Products','common-products',74,'2023-12-13 06:58:15','2023-12-13 06:58:15');`);

        await queryRunner.query(`INSERT INTO permission_module
                                (module_id,name,slug_name,sort_order,module_group_id,created_date,modified_date)
                                VALUES (174,'Buyer Address list','buyer-address-list',230,60,'2021-08-04 12:24:56','2021-08-04 12:24:56'),
                                (239,'Common Catalog Product List','common-catalog-product-list',259,69,'2022-06-09 04:52:14','2022-06-09 04:52:14'),
                                (241,'Set Common Products','set-common-products',261,69,'2022-06-09 04:52:14','2022-06-09 04:52:14'),
                                (242,'Common Product Detail','common-product-detail',262,69,'2022-06-09 04:52:14','2022-06-09 04:52:14'),
                                (243,'Edit Common Product Status','update-common-product-status',263,69,'2022-06-09 04:52:14','2022-06-09 04:52:14');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //   --
    }

}
