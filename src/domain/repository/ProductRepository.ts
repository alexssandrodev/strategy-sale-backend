
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

interface ProductRepository {
    save(product: Product): Promise<void>;
    getProducts(): Promise<Product[]>;
    getProductsBySaleId(saleId: string): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
    getCategories(): Promise<Category[]>;
}

export { ProductRepository };
