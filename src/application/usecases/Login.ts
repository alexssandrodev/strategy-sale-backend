import { UserRepository } from "@src/domain/repository/UserRepository";

class Login {

    constructor(readonly userRepository: UserRepository) {}

    async execute(email: string, password: string) {
        const userData = await this.userRepository.getByEmail(email);

        if (!userData) {
            throw new Error('Usuário não encontrado.');
        }

        const isPasswordHash = await userData.password.comparePassword(password, userData.password.value);

        if (!isPasswordHash) {
            throw new Error('Email ou senha não conferem.');
        }

        const token = userData.generateToken();
        const userPayload = userData.verifyToken(token);

        return {
            token,
            userPayload
        };
    }

}

export { Login }; 
