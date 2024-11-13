import { ProductRepository } from "@src/domain/repository/ProductRepository";

class GetCategories {

    constructor(readonly productRepo: ProductRepository) { }

    async execute() {
        const categories = await this.productRepo.getCategories();

        return categories;
    }

}

export {GetCategories };
