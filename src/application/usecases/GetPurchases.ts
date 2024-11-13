import { PurchaseRepository } from "@src/domain/repository/PurchaseRepository";

class GetPurchases {

    constructor(readonly purchaseRepo: PurchaseRepository) { }

    async execute() {
        const purchases = await this.purchaseRepo.getPurchases();
        return purchases;
    }

}

export { GetPurchases };
