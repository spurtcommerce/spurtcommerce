import { In, getManager } from 'typeorm';
import { Settings } from '../models/Setting';
import { Category } from '../models/CategoryModel';

export async function StoreCategoryValidator(req: any, res: any, next: any): Promise<any> {
    const settingService = getManager().getRepository(Settings);
    const origin = req.get('origin');
    const AccessKey = req.get('key');
    const siteData = await settingService.findOne({
        accessKey: AccessKey,
    });
    if (!siteData) {
        return res.status(400).send({
            status: 0,
            message: `Couldn't Able to Find Configuration Or Invalid Key for the site ${origin} -- Contact Your Admin..!`,
        });
    }
    const error: any[] = [];
    const categories: Category[] = [];
    let tempParentId: number[] = [];
    const siteSettingCategories = siteData.siteCategory.split(',');
    const categoryService = getManager().getRepository(Category);
    const siteCategories: Category[] = await categoryService.find({
        categorySlug: In(siteSettingCategories),
    });
    for (const siteCategory of siteCategories) {
        tempParentId = [siteCategory.categoryId];
        categories.push(siteCategory);
        while (true) {
            const chlidCategory: Category[] = await categoryService.find({
                where: {
                    parentInt: In(tempParentId),
                },
            });
            tempParentId = [];
            if (chlidCategory?.length === 0) {
                break;
            }
            categories.push(...chlidCategory);
            tempParentId = chlidCategory.map(category => category.categoryId);
        }
    }
    const siteCategorySlugList = categories.map(category => `'${category.categorySlug}'`);
    const siteCategoryIds = categories.map(category => category.categoryId);
    const query = req.query;
    if (query) {
        for (const [key, value] of Object.entries(query)) {
            if (key === 'categoryslug' || key === 'categorySlug') {
                if (!siteCategorySlugList.includes(`'${value.toString()}'`) && value.toString() !== '') {
                    error.push(value);
                }
            }
        }
    }
    if (error?.length > 0) {
        return res.status(400).send({
            status: 0,
            message: `Category ${error[0].toString()} is Not Allowed for this Site..! -- Contact Your Admin`,
        });
    }
    req.store = {
        Id: siteData.settingsId,
        siteCategoryIds,
        siteCategorySlugList,
    };
    next();
}
