import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../api/core/models/User';
export class CreateUser implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const user = new User();
        user.userId = 1;
        user.username = 'admin@spurtcart.com';
        user.password = await User.hashPassword('spurt123@');
        user.email = 'no-reply@spurtcommerce.com';
        user.userGroupId = 1;
        return await em.save(user);
    }
}
