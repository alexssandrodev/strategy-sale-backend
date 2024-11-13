import { FastifyReply, FastifyRequest } from "fastify";

function authMiddleware(request: FastifyRequest, reply: FastifyReply, next: any) {
    const requestToken = request.headers.authorization;
    const token = requestToken?.split(' ')[1];

    if (!token) {
        throw new Error('Token não informado, faça login no sistema.');
    }

    next();
}

export { authMiddleware };
