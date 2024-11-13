import { Product } from "@src/domain/entities/Product";
import { v4 as uuidv4 } from 'uuid';

class Sale {

    readonly saleId: string;
    readonly userId: string;
    readonly title: string;
    readonly createdAt: Date;
    readonly products: Product[];

    constructor(saleId: string, userId: string, title: string, createdAt: Date) {
        if (!title) {
            throw new Error('O titulo é obrigatório.');
        }
        if (!createdAt) {
            throw new Error('A data é obrigatória.');
        }
        this.saleId = saleId;
        this.userId = userId;
        this.title = title;
        this.createdAt = createdAt;
        this.products = [];
    }

    static create(userId: string, title: string, createdAt: Date) {
        const saleId = uuidv4();
        return new Sale(saleId, userId, title, createdAt);
    }

    addPoduct(product: Product) {
        this.products.push(product);
    }

}

export { Sale };
