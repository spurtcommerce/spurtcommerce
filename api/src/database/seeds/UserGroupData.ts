import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import { UserGroup } from '../../api/models/UserGroup';
export class UserGroupData implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<UserGroup> {
        const em = connection.createEntityManager();
        const user = new UserGroup();
        user.groupId = 1;
        user.name = 'admin';
        return await em.save(user);
    }
}
