import { Product } from "./Product";

class Purchase {

    readonly purchseId: string;
    readonly saleId: string;
    readonly userId: string;
    readonly products: string[];
    readonly createdAt: Date;
    readonly productsList: Product[];

    constructor(purchseId: string, saleId: string, userId: string, products: string[], createdAt: Date) {
        this.purchseId = purchseId;
        this.saleId = saleId;
        this.userId = userId;
        this.products = products;
        this.createdAt = createdAt;
        this.productsList = [];
    }

    addProduct(product: Product, productId: string) {
        for (let i = 0; i < this.products.length; i++) {
            if (productId === this.products[i]) {
                this.productsList.push(product);
            }
        }
    }

}

export { Purchase };
