import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from 'uuid';
import { Input, Signup } from "@src/application/usecases/Signup";
import { UserRepositoryDatabase } from "../database/repository/UserRepositoryDatabase";
import { Login } from "@src/application/usecases/Login";

export default async function userRoutes(fastify: FastifyInstance, connection: any) {

    const userRepository = new UserRepositoryDatabase(connection);
    const signup = new Signup(userRepository);
    const login = new Login(userRepository);

    fastify.post('/users/signup', async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const { name, email, password } = request.body as Input;
            const user = await signup.execute(uuidv4(), name, email, password, new Date());

            reply.code(201).send({
                userId: user.userId,
                message: 'Usuário cadastrado com sucesso!'
            });
        } catch (error) {
            console.log(error);
            reply.code(500).send(error);
        }
    });

    fastify.post('/users/login', async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const { email, password } = request.body as { email: string, password: string };
            const { token, userPayload } = await login.execute(email, password);

            reply.code(201).send({
                token,
                userPayload,
                message: 'Login efetuado com sucesso!!'
            });
        } catch (error) {
            console.log(error);
            reply.code(500).send(error);
        }
    });
}
