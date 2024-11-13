import { PurchaseRepository } from "@src/domain/repository/PurchaseRepository";
import { DatabaseConnection } from "../PgPromiseAdapter";
import { Purchase } from "@src/domain/entities/Purchase";

class PurchaseRepositoryDatabase implements PurchaseRepository {

    constructor(readonly connection: DatabaseConnection) { }

    async save(purchase: Purchase): Promise<void> {
        await this.connection.query(`INSERT INTO purchases (purchase_id, sale_id, user_id, products, created_at)
            VALUES ($1, $2, $3, $4, $5)`,
            [purchase.purchseId, purchase.saleId, purchase.userId, purchase.products, purchase.createdAt]);
    }

    async getPurchases(): Promise<Purchase[]> {
        const purchases = await this.connection.query('SELECT * FROM purchases', []);
        return purchases;
    }

    async getPurchaseById(purchaseId: string): Promise<Purchase> {
        throw new Error("Method not implemented.");
    }

}

export { PurchaseRepositoryDatabase };
