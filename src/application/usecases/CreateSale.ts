import { Sale } from "@src/domain/entities/Sale";
import { SaleRepository } from "@src/domain/repository/SaleRepository";
import { UserRepository } from "@src/domain/repository/UserRepository";

class CreateSale {

    constructor(readonly saleRepo: SaleRepository, readonly userRepo: UserRepository) { }

    async execute(input: Input): Promise<Ouput> {
        const userData = await this.userRepo.getById(input.userId);
        const sale = Sale.create(userData.userId, input.title, input.createdAt);
        await this.saleRepo.saveSale(sale);

        return {
            saleId: sale.saleId
        }
    }

}

type Input = {
    userId: string;
    title: string;
    createdAt: Date;
}

type Ouput = {
    saleId: string;
}

export { CreateSale };
