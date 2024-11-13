import { Sale } from "@src/domain/entities/Sale";
import { SaleRepository } from "@src/domain/repository/SaleRepository";

class GetSaleById {

    constructor(readonly saleRepo: SaleRepository) { }

    async execute(sale_id: string) {
        const saleData = await this.saleRepo.getSaleById(sale_id);
        
        return new Sale(saleData.saleId, saleData.userId, saleData.title, saleData.createdAt);
    }

}

export { GetSaleById };
