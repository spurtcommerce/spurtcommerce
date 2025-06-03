import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from '../../api/core/models/CategoryModel'; // Adjust path as necessary

interface CannabisCategory {
    name: string;
    description: string;
    slug?: string;
}

export class SetupCannabisCategories20250531144248 implements MigrationInterface {
    private categories: CannabisCategory[] = [
        { name: 'Flower', description: 'High-quality cannabis flower buds. Choose from Indica, Sativa, and Hybrid strains.' },
        { name: 'Edibles', description: 'Delicious cannabis-infused edibles, including gummies, chocolates, beverages, and more.' },
        { name: 'Concentrates', description: 'Potent cannabis concentrates such as oils, shatter, wax, rosin, and live resin.' },
        { name: 'Vape Pens & Cartridges', description: 'Convenient pre-filled vape pens and THC/CBD cartridges.' },
        { name: 'Tinctures & Sublinguals', description: 'Easy-to-use cannabis tinctures and sublingual drops for precise dosing.' },
        { name: 'Topicals', description: 'Cannabis-infused creams, balms, and lotions for localized relief.' },
        { name: 'Pre-rolls', description: 'Ready-to-smoke pre-rolled cannabis joints and blunts.' },
        { name: 'Accessories', description: 'A wide range of cannabis accessories including pipes, bongs, grinders, and rolling papers.' },
    ];

    private generateSlug(name: string): string {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        const categoryRepository = queryRunner.manager.getRepository(Category);
        let currentSortOrder = 0;

        // Try to find the highest current sortOrder to continue from there
        // Select only necessary fields to avoid issues with columns like family_id if they don't exist in DB
        const lastCategory = await categoryRepository.findOne({ select: ["categoryId", "sortOrder"], order: { sortOrder: 'DESC' } });
        if (lastCategory && typeof lastCategory.sortOrder === 'number') { // Check if sortOrder is a number
            currentSortOrder = lastCategory.sortOrder;
        }

        for (const catData of this.categories) {
            const categorySlug = this.generateSlug(catData.name);
            // Select only necessary fields for checking existence
            const existingCategory = await categoryRepository.findOne({ select: ["categoryId", "categorySlug"], where: { categorySlug } });

            if (!existingCategory) {
                currentSortOrder++;
                const newCategory = categoryRepository.create({
                    name: catData.name,
                    categorySlug,
                    categoryDescription: catData.description,
                    parentInt: 0, // Top-level category
                    sortOrder: currentSortOrder,
                    isActive: 1,
                    image: '', // No image for now
                    imagePath: '', // No image path for now
                    industryId: 0, // Provide a default value
                    familyId: 0,   // Provide a default value
                });
                await categoryRepository.save(newCategory);
                console.log(`Category "${catData.name}" created with slug "${categorySlug}" and sortOrder ${currentSortOrder}`);
            } else {
                console.log(`Category "${catData.name}" with slug "${categorySlug}" already exists. Skipping.`);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const categoryRepository = queryRunner.manager.getRepository(Category);
        for (const catData of this.categories) {
            const categorySlug = this.generateSlug(catData.name);
            const categoryToDelete = await categoryRepository.findOne({ where: { categorySlug } });
            if (categoryToDelete) {
                await categoryRepository.remove(categoryToDelete);
                console.log(`Category "${catData.name}" with slug "${categorySlug}" deleted.`);
            } else {
                console.log(`Category "${catData.name}" with slug "${categorySlug}" not found. Skipping deletion.`);
            }
        }
    }
}
