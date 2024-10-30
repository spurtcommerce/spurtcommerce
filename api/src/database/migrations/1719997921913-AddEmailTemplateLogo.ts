import {MigrationInterface, QueryRunner, TableColumn, getRepository} from 'typeorm';

export class AddEmailTemplateLogo1719997921913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('settings', 'instagram_logo');
        if (!columnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'instagram_logo',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist2 = await queryRunner.hasColumn('settings', 'facebook_logo');
        if (!columnExist2) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'facebook_logo',
                type: 'varchar',
                length: '100',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist3 = await queryRunner.hasColumn('settings', 'linkedin_logo');
        if (!columnExist3) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'linkedin_logo',
                type: 'varchar',
                length: '100',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist4 = await queryRunner.hasColumn('settings', 'x_logo');
        if (!columnExist4) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'x_logo',
                type: 'varchar',
                length: '100',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist5 = await queryRunner.hasColumn('settings', 'youtube_logo');
        if (!columnExist5) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'youtube_logo',
                type: 'varchar',
                length: '100',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist6 = await queryRunner.hasColumn('settings', 'social_path');
        if (!columnExist6) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'social_path',
                type: 'varchar',
                length: '100',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist7 = await queryRunner.hasColumn('settings', 'linkedin');
        if (!columnExist7) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'linkedin',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist8 = await queryRunner.hasColumn('settings', 'youtube');
        if (!columnExist8) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'youtube',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const exist = await queryRunner.hasTable('settings');
        if (exist) {
            const changeSettingSeed = [{
                settingsId: 2,
                youtubeLogo: 'youtube_1717241980138.png',
                xLogo: 'x_1717242027394.png',
                linkedinLogo: 'linkdin_1717242258958.png',
                facebookLogo: 'facebook_1717241584201.png',
                instagramLogo: 'instagram_1717241905383.png',
                socialPath: 'social/',
                instagram: 'https://www.instagram.com/piccosoft_/',
                youtube: 'https://www.youtube.com/',
                twitter: 'https://twitter.com/piccosoft?lang=en',
                linkedin: 'https://in.linkedin.com/company/piccosoft',
                facebook: 'https://www.facebook.com/piccosoft/',
            },
            ];
            await getRepository('settings').save(changeSettingSeed);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }

}
