"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBlogsMenu1647264994076 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddBlogsMenu1647264994076 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const BlogsSeed = [
                {
                    menuName: 'Blogs',
                    menuModule: 'CMS',
                    path: '#/cms/blogs',
                    icon: 'cms/cms-blog-on.svg',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('PluginMenu').save(BlogsSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddBlogsMenu1647264994076 = AddBlogsMenu1647264994076;
//# sourceMappingURL=1647264994076-AddBlogsMenu.js.map