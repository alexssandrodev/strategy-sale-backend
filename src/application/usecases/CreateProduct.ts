import { Product } from "@src/domain/entities/Product";
import { ProductRepository } from "@src/domain/repository/ProductRepository";

class CreateProduct {

    constructor(readonly productRepo: ProductRepository) { }

    async execute(input: Input): Promise<Output> {
        const product = new Product(input.productId, input.userId, input.saleId, input.title, input.price, input.category, input.description, input.quantity, input.createdAt);
        this.productRepo.save(product);
        const totalPrice = product.calculateTotal();

        return {
            totalPrice,
            productId: product.productId
        }
    }

}

type Input = {
    productId: string;
    userId: string;
    saleId: string;
    title: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    createdAt: Date;
}

type Output = {
    totalPrice: number;
    productId: string;
}

export { CreateProduct };
