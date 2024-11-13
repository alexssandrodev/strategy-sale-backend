import { User } from "@src/domain/entities/User";
import { UserRepository } from "@src/domain/repository/UserRepository";

class Signup {

    constructor(readonly userRepository: UserRepository) {}

    async execute(userId: string, name: string, email: string, password: string, createdAt: Date): Promise<Output> {
        
        const userData = await this.userRepository.getByEmail(email);

        if (userData) {
            throw new Error('Este email já existe no sistema, tente outro email!');
        }

        const user = new User(userId, name, email, password, createdAt);
        const hash = await user.password.encryptPassword(password);

        this.userRepository.save(user.userId, user.name, user.email.getValue(), hash, user.createdAt);

        return {
            userId: user.userId
        }
    }

}

export type Input = {
    userId: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

type Output = {
    userId: string;
}

export { Signup }
