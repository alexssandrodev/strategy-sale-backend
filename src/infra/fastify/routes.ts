import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from 'uuid';
import { UserRepositoryDatabase } from "../database/repository/UserRepositoryDatabase";
import { ProductRepostoryDatabase } from "../database/repository/ProductRepostoryDatabase";
import { CreateProduct } from "@src/application/usecases/CreateProduct";
import { GetProductById } from "@src/application/usecases/GetProductById";
import { CreateSale } from "@src/application/usecases/CreateSale";
import { GetProductsBySaleId } from "@src/application/usecases/GetProductsBySaleId";
import { Getsales } from "@src/application/usecases/GetSales";
import { SaleRepostoryDatabase } from "../database/repository/SaleRepostoryDatabase";
import { authMiddleware } from "@src/middlewares/auth-middleware";
import { GetSaleById } from "@src/application/usecases/GetSaleById";
import { GetCategories } from "@src/application/usecases/GetCategories";
import { GetProducts } from "@src/application/usecases/GetProducts";

export default async function routes(fastify: FastifyInstance, connection: any) {

    const userRepository = new UserRepositoryDatabase(connection);
    const productRepository = new ProductRepostoryDatabase(connection);
    const saleRepository = new SaleRepostoryDatabase(connection);
    const createProduct = new CreateProduct(productRepository);
    const getProductById = new GetProductById(productRepository);
    const createSale = new CreateSale(saleRepository, userRepository);
    const getProductBySaleId = new GetProductsBySaleId(productRepository);
    const getProducts = new GetProducts(productRepository);
    const getSales = new Getsales(saleRepository);
    const getSaleById = new GetSaleById(saleRepository);
    const getCategories = new GetCategories(productRepository);

    fastify.get('/product_detail/:product_id', async (request: FastifyRequest, reply: FastifyReply) => {
        
        try {
            const { product_id } = request.params as { product_id: string };
            const productDetail = await getProductById.execute(product_id);
            
            reply.code(200).send(productDetail);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    fastify.get('/products/:sale_id', { preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const { sale_id } = request.params as { sale_id: string };
            const productsSale = await getProductBySaleId.execute(sale_id);
            
            reply.code(200).send(productsSale);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    fastify.get('/products', { preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const products = await getProducts.execute();
            
            reply.code(200).send(products);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    fastify.post('/products/:user_id', { preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const { sale_id, title, price, category, description, quantity, created_at } = request.body as {
                sale_id: string, title: string, price: number, category: string,
                description: string, quantity: number, created_at: Date
            };
            
            const { user_id } = request.params as { user_id: string };

            const productId = uuidv4();
            const inputProduct = {
                productId: productId,
                userId: user_id,
                saleId: sale_id,
                title: title,
                price: price,
                category: category,
                description: description,
                quantity: quantity,
                createdAt: created_at
            }
            const product = await createProduct.execute(inputProduct);

            reply.code(201).send({
                totalPrice: product.totalPrice,
                productId: product.productId,
                message: 'Produto cadastrado com sucesso!'
            });
        } catch (error) {
            console.log(error);
            reply.code(500).send(error);
        }
    });

    fastify.post('/sales/:user_id', { preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const { user_id } = request.params as { user_id: string };
            const { title, created_at } = request.body as { title: string, created_at: Date };

            const inputSale = {
                userId: user_id,
                title,
                createdAt: created_at
            }

            const outputSale = await createSale.execute(inputSale);

            reply.code(201).send({
                saleId: outputSale.saleId,
                message: 'Venda cadastrada com sucesso!'
            });
        } catch (error) {
            console.log(error);
            reply.code(500).send(error);
        }
    });

    fastify.get('/sales/:user_id', { preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { user_id } = request.params as { user_id: string };
            const sales = await getSales.execute(user_id);
            
            reply.code(200).send(sales);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    fastify.get('/sale-detail/:sale_id', { preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { sale_id } = request.params as { sale_id: string };
            const saleDetail = await getSaleById.execute(sale_id);
            
            reply.code(200).send(saleDetail);
        } catch (error) {
            reply.code(500).send(error);
        }
    });

    fastify.get('/categories', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const categories = await getCategories.execute();
            
            reply.code(200).send(categories);
        } catch (error) {
            reply.code(500).send(error);
        }
    });
}
