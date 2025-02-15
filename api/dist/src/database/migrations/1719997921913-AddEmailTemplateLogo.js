"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailTemplateLogo1719997921913 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddEmailTemplateLogo1719997921913 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('settings', 'instagram_logo');
            if (!columnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'instagram_logo',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist2 = yield queryRunner.hasColumn('settings', 'facebook_logo');
            if (!columnExist2) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'facebook_logo',
                    type: 'varchar',
                    length: '100',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist3 = yield queryRunner.hasColumn('settings', 'linkedin_logo');
            if (!columnExist3) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'linkedin_logo',
                    type: 'varchar',
                    length: '100',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist4 = yield queryRunner.hasColumn('settings', 'x_logo');
            if (!columnExist4) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'x_logo',
                    type: 'varchar',
                    length: '100',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist5 = yield queryRunner.hasColumn('settings', 'youtube_logo');
            if (!columnExist5) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'youtube_logo',
                    type: 'varchar',
                    length: '100',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist6 = yield queryRunner.hasColumn('settings', 'social_path');
            if (!columnExist6) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'social_path',
                    type: 'varchar',
                    length: '100',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist7 = yield queryRunner.hasColumn('settings', 'linkedin');
            if (!columnExist7) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'linkedin',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const columnExist8 = yield queryRunner.hasColumn('settings', 'youtube');
            if (!columnExist8) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'youtube',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const exist = yield queryRunner.hasTable('settings');
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
                yield (0, typeorm_1.getRepository)('settings').save(changeSettingSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //
        });
    }
}
exports.AddEmailTemplateLogo1719997921913 = AddEmailTemplateLogo1719997921913;
//# sourceMappingURL=1719997921913-AddEmailTemplateLogo.js.map