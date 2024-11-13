import { Product } from "@src/domain/entities/Product";
import { ProductRepository } from "@src/domain/repository/ProductRepository";

class GetProducts {

    constructor(readonly productRpo: ProductRepository) { }

    async execute(): Promise<Product[]> {
        const products = await this.productRpo.getProducts();

        return products;
    }

}

export { GetProducts };
