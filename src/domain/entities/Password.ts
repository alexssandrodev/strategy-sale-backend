import { hash, compare,  genSalt } from 'bcrypt';

class Password {

    private _value: string;

    constructor(password: string) {
        if (!password || password.length < 8) {
            throw new Error('A senha é obrigatória e precisa ter 8 ou mais caracters!');
        }
        this._value = password;
    }

    async encryptPassword(password: string) {
        const salt = await genSalt(10, 'b');
        const encrypt = await hash(password, salt);
        return encrypt;
    }

    async comparePassword(userPassword: string, encrypt: string) {
        const result = await compare(userPassword, encrypt);
        return result;
    }

    get value() {
        return this._value;
    }

}

export { Password };
