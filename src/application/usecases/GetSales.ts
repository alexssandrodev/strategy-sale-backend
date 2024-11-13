
import { SaleRepository } from "@src/domain/repository/SaleRepository";

class Getsales {

    constructor(readonly saleRepository: SaleRepository) { }

    async execute(userId: string) {
        const sales = await this.saleRepository.getSales(userId);
        
        return sales;
    }

}

export { Getsales };
