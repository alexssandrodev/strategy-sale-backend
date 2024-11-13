import fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";
import { PgPromiseAdapter } from '../database/PgPromiseAdapter';
import userRoutes from "./userRoutes";
import purchaseRoutes from "./purchaseRoutes";

const app = fastify();
const connection = new PgPromiseAdapter();
// connection.executeScript('../database/create.sql');
app.register(cors);
app.register(routes, connection);
app.register(userRoutes, connection);
app.register(purchaseRoutes, connection);

app.listen({
    port: 3333
}, () => console.log('server running on http://localhost:3333'));