import { Purchase } from "@src/domain/entities/Purchase";
import { PurchaseRepository } from "@src/domain/repository/PurchaseRepository";

class CreatePurchase {

    constructor(readonly purchaseRepo: PurchaseRepository) { }

    async execute(input: Input): Promise<Output> {
        const purchase = new Purchase(input.purchseId, input.saleId, input.userId, input.products, input.createdAt);
        await this.purchaseRepo.save(purchase);

        return {
            purchaseId: purchase.purchseId
        }
    }

}

type Input = {
    purchseId: string;
    saleId: string;
    products: string[];
    userId: string;
    createdAt: Date;
}

type Output = {
    purchaseId: string;
}

export { CreatePurchase };
