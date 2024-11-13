import { Product } from "@src/domain/entities/Product";
import { ProductRepository } from "@src/domain/repository/ProductRepository";
import { PgPromiseAdapter } from "../PgPromiseAdapter";
import { Category } from "@src/domain/entities/Category";

class ProductRepostoryDatabase implements ProductRepository {

    constructor(readonly connection: PgPromiseAdapter) { }

    async save(product: Product): Promise<void> {
        await this.connection.query(`INSERT INTO products (product_id, user_id, sale_id, title, price,
            category, description, quantity, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [product.productId, product.userId, product.saleId, product.title, product.price, product.category,
            product.description, product.quantity, product.createdAt
            ]);
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.connection.query('SELECT * FROM products', []);

        return products;
    }

    async getProductsBySaleId(saleId: string): Promise<Product[]> {
        const products = await this.connection.query('SELECT * FROM products WHERE sale_id = $1', [saleId]);

        return products;
    }

    async getProductById(productId: string): Promise<Product> {
        const [productData] = await this.connection.query('SELECT * FROM products WHERE product_id = $1', [productId]);

        return new Product(productData.product_id, productData.user_id, productData.sale_id, productData.title, productData.price, productData.category, productData.description, productData.quantity, productData.created_at);
    }

    async getCategories(): Promise<Category[]> {
        const categories = await this.connection.query('SELECT * FROM categorys', []);

        return categories;
    }
}

export { ProductRepostoryDatabase };
