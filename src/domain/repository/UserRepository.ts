
import { User } from "../entities/User";

interface UserRepository {
    save(userId: string, name: string, email: string, password: string, createdAt: Date): Promise<void>;
    getByEmail(email: string): Promise<User | null>;
    getById(userId: string): Promise<User>;
}

export { UserRepository };
