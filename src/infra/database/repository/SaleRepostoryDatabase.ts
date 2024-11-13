
import { PgPromiseAdapter } from "../PgPromiseAdapter";
import { Sale } from "@src/domain/entities/Sale";
import { SaleRepository } from "@src/domain/repository/SaleRepository";

class SaleRepostoryDatabase implements SaleRepository {

    constructor(readonly connection: PgPromiseAdapter) { }

    async saveSale(sale: Sale): Promise<void> {
        await this.connection.query('INSERT INTO sales (sale_id, user_id, title, created_at) VALUES ($1, $2, $3, $4)', [sale.saleId, sale.userId, sale.title, sale.createdAt]);
    }

    async getSaleById(sale_id: string): Promise<Sale> {
        const [saleData] = await this.connection.query(`SELECT s.sale_id, s.user_id, s.title, s.created_at, u.name 
            FROM sales AS s
            JOIN users AS u ON (u.user_id = s.user_id)
            WHERE s.sale_id = $1`, [sale_id]);

        return new Sale(saleData.sale_id, saleData.user_id, saleData.title, saleData.created_at);
    }

    async getSales(userId: string): Promise<Sale[]> {
        const sales = await this.connection.query('SELECT * FROM sales WHERE user_id = $1', [userId]);
        
        return sales;
    }
}

export { SaleRepostoryDatabase };
