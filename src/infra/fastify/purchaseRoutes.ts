import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from 'uuid';
import { CreatePurchase } from "@src/application/usecases/CreatePurchase";
import { PurchaseRepositoryDatabase } from "../database/repository/PurchaseRepositoryDatabase";
import { GetPurchases } from "@src/application/usecases/GetPurchases";
import { authMiddleware } from "@src/middlewares/auth-middleware";

export default async function purchaseRoutes(fastify: FastifyInstance, connection: any) {

    const purchaseRepository = new PurchaseRepositoryDatabase(connection);
    const createPurchase = new CreatePurchase(purchaseRepository);
    const getPurchases = new GetPurchases(purchaseRepository);

    fastify.post('/purchases', { preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const { sale_id, user_id, products } = request.body as {
                sale_id: string, user_id: string, products: string[]
            };

            const purchaseId = uuidv4();
            const createdAt = new Date();

            const inputPurchase = {
                purchseId: purchaseId,
                saleId: sale_id,
                userId: user_id,
                products: products,
                createdAt: createdAt
            }
            const outputPurchase = await createPurchase.execute(inputPurchase);

            reply.code(201).send({
                purchaseId: outputPurchase.purchaseId,
                message: 'Compra cadastrada com sucesso!'
            });
        } catch (error) {
            console.log(error);
            reply.code(500).send(error);
        }
    });

    fastify.get('/purchases', { preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const purchases = await getPurchases.execute();

            reply.code(201).send(purchases);
        } catch (error) {
            console.log(error);
            reply.code(500).send(error);
        }
    });
}
