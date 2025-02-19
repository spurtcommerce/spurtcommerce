import { IsNull, MigrationInterface, QueryRunner, TableColumn, getRepository } from 'typeorm';

export class AddColumnPriceTypeInProduct1715835790108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const columnExist = await queryRunner.hasColumn('product', 'price_type');

        if (!columnExist) {

            await queryRunner.addColumn('product', new TableColumn({
                name: 'price_type',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 1,
            }));

            const productRepo = getRepository('Product');
            await productRepo.update({ priceType: IsNull() }, { priceType: 1 });

            await queryRunner.changeColumn(
                'product',
                new TableColumn({
                    name: 'price_type',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 1,
                }),
                new TableColumn({
                    name: 'price_type',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                    default: 1,
                })
            );
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
