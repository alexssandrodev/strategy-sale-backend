import { Purchase } from "../entities/Purchase";

interface PurchaseRepository {
    save(purchase: Purchase): Promise<void>;
    getPurchases(): Promise<Purchase[]>;
    getPurchaseById(purchaseId: string): Promise<Purchase>;
}

export { PurchaseRepository };
