
import { Sale } from "../entities/Sale";

interface SaleRepository {
    saveSale(sale: Sale): Promise<void>;
    getSaleById(sale_id: string): Promise<Sale>;
    getSales(userId: string): Promise<Sale[]>;
}

export { SaleRepository };
