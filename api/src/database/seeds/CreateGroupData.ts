import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { UserGroup } from '../../api/core/models/UserGroup';
export class CreateGroupData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const user = new UserGroup();
        user.groupId = 1;
        user.name = 'admin';
        return await em.save(user);
    }
}
