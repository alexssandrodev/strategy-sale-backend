import { Product } from "@src/domain/entities/Product";
import { ProductRepository } from "@src/domain/repository/ProductRepository";

class GetProductById {

    constructor(readonly productRpo: ProductRepository) { }

    async execute(productId: string): Promise<Product> {
        const product = await this.productRpo.getProductById(productId);
        
        return new Product(product.productId, product.userId, product.saleId, product.title, product.price, product.category, product.description, product.quantity, product.createdAt);
    }

}

export { GetProductById };
