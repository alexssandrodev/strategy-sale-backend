import { Input } from "@src/application/usecases/Signup";
import { User } from "@src/domain/entities/User";
import { UserRepository } from "@src/domain/repository/UserRepository";
import { DatabaseConnection } from "../PgPromiseAdapter";

class UserRepositoryDatabase implements UserRepository {

    constructor(readonly connection: DatabaseConnection) {}
    
    async save(userId: string, name: string, email: string, password: string, createdAt: Date): Promise<void> {
        await this.connection.query('INSERT INTO users (user_id, name, email, password, created_at) VALUES ($1, $2, $3, $4, $5)', [userId, name, email, password, createdAt]);
    }
    
    async getByEmail(email: string): Promise<User | null> {
        const [userData] = await this.connection.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userData) {
            return new User(userData.user_id, userData.name, userData.email, userData.password, userData.createdAt);
        }
        return null;
    }

    async getById(userId: string): Promise<User> {
        const [userData] = await this.connection.query('SELECT * FROM users WHERE user_id = $1', [userId]);

        return new User(userData.user_id, userData.name, userData.email, userData.password,userData.created_at);
    }

}

export { UserRepositoryDatabase };
