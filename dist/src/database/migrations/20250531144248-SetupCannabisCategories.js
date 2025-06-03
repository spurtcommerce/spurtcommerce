"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupCannabisCategories20250531144248 = void 0;
const tslib_1 = require("tslib");
const CategoryModel_1 = require("../../api/core/models/CategoryModel"); // Adjust path as necessary
class SetupCannabisCategories20250531144248 {
    constructor() {
        this.categories = [
            { name: 'Flower', description: 'High-quality cannabis flower buds. Choose from Indica, Sativa, and Hybrid strains.' },
            { name: 'Edibles', description: 'Delicious cannabis-infused edibles, including gummies, chocolates, beverages, and more.' },
            { name: 'Concentrates', description: 'Potent cannabis concentrates such as oils, shatter, wax, rosin, and live resin.' },
            { name: 'Vape Pens & Cartridges', description: 'Convenient pre-filled vape pens and THC/CBD cartridges.' },
            { name: 'Tinctures & Sublinguals', description: 'Easy-to-use cannabis tinctures and sublingual drops for precise dosing.' },
            { name: 'Topicals', description: 'Cannabis-infused creams, balms, and lotions for localized relief.' },
            { name: 'Pre-rolls', description: 'Ready-to-smoke pre-rolled cannabis joints and blunts.' },
            { name: 'Accessories', description: 'A wide range of cannabis accessories including pipes, bongs, grinders, and rolling papers.' },
        ];
    }
    generateSlug(name) {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryRepository = queryRunner.manager.getRepository(CategoryModel_1.Category);
            let currentSortOrder = 0;
            // Try to find the highest current sortOrder to continue from there
            const lastCategory = yield categoryRepository.findOne({ order: { sortOrder: 'DESC' } });
            if (lastCategory && lastCategory.sortOrder) {
                currentSortOrder = lastCategory.sortOrder;
            }
            for (const catData of this.categories) {
                const categorySlug = this.generateSlug(catData.name);
                const existingCategory = yield categoryRepository.findOne({ where: { categorySlug } });
                if (!existingCategory) {
                    currentSortOrder++;
                    const newCategory = categoryRepository.create({
                        name: catData.name,
                        categorySlug,
                        categoryDescription: catData.description,
                        parentInt: 0,
                        sortOrder: currentSortOrder,
                        isActive: 1,
                        image: '',
                        imagePath: '', // No image path for now
                        // industryId: 1, // Assuming a default industryId if required and not nullable
                    });
                    yield categoryRepository.save(newCategory);
                    console.log(`Category "${catData.name}" created with slug "${categorySlug}" and sortOrder ${currentSortOrder}`);
                }
                else {
                    console.log(`Category "${catData.name}" with slug "${categorySlug}" already exists. Skipping.`);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryRepository = queryRunner.manager.getRepository(CategoryModel_1.Category);
            for (const catData of this.categories) {
                const categorySlug = this.generateSlug(catData.name);
                const categoryToDelete = yield categoryRepository.findOne({ where: { categorySlug } });
                if (categoryToDelete) {
                    yield categoryRepository.remove(categoryToDelete);
                    console.log(`Category "${catData.name}" with slug "${categorySlug}" deleted.`);
                }
                else {
                    console.log(`Category "${catData.name}" with slug "${categorySlug}" not found. Skipping deletion.`);
                }
            }
        });
    }
}
exports.SetupCannabisCategories20250531144248 = SetupCannabisCategories20250531144248;
//# sourceMappingURL=20250531144248-SetupCannabisCategories.js.map