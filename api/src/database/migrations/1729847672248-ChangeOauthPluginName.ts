import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class ChangeOauthPluginName1729847672248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getRepository('Plugins');
        const plugin: any = await repo.findOne({
            where: {
                slugName: 'gmail',
            },
        });
        if (plugin) {
            plugin.displayName = 'Social Login - Gmail';
            await repo.save(plugin);
        }
        const plugin2: any = await repo.findOne({
            where: {
                slugName: 'facebook',
            },
        });
        if (plugin2) {
            plugin2.displayName = 'Social Login - Facebook';
            await repo.save(plugin2);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
