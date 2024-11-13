import { sign, verify } from "jsonwebtoken";
import { Email } from "./Email";
import { Password } from "./Password";

class User {

    userId: string;
    readonly name: string;
    readonly email: Email;
    readonly password: Password;
    readonly createdAt: Date;
    private secretKey: string;

    constructor(userId: string, name: string, email: string, password: string, createdAt: Date) {
        if (!name || name == '') {
            throw new Error('O nome é obrigatório!');
        }
        
        this.userId = userId;
        this.name = name;
        this.email = new Email(email);
        this.password = new Password(password);
        this.createdAt = createdAt;    
        this.secretKey = 'webdesign';
    }

    generateToken() {
        const payload = {
            userId: this.userId,
            name: this.name,
            email: this.email.getValue(),
        }
        const token = sign(payload, this.secretKey, { expiresIn: '7d' });
        return token;
    }

    verifyToken(token: string) {
        const payloadUser = verify(token, this.secretKey);
        return payloadUser;
    }

}

export { User };
