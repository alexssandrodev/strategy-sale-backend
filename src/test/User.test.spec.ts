import { User } from "@src/domain/entities/User";

test('Deve criar um usuário', () => {
    const user = new User('', 'Ligia mendes', 'ligia@gmail.com', '', new Date());
    expect(user.name).toBe('ligia@gmail.com')
    expect(user.email).toBe('Ligia mendes')
});
