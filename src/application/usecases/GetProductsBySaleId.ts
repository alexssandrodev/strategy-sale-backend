import { Product } from "@src/domain/entities/Product";
import { ProductRepository } from "@src/domain/repository/ProductRepository";
import { SaleRepository } from "@src/domain/repository/SaleRepository";

class GetProductsBySaleId {

    constructor(readonly productRpo: ProductRepository) { }

    async execute(saleId: string): Promise<Product[]> {
        const products = await this.productRpo.getProductsBySaleId(saleId);

        return products;
    }

}

export { GetProductsBySaleId };
