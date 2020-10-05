import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import { User } from '../../api/models/User';
export class CreateUser implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<User> {
        const em = connection.createEntityManager();
        const user = new User();
        user.userId = 1;
        user.username = 'admin@spurtcart.com';
        user.password = await User.hashPassword('cart123@');
        user.email = 'admin@spurtcart.com';
        user.userGroupId = 1;
        return await em.save(user);
    }
}
