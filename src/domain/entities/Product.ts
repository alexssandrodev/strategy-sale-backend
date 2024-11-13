
class Product {

    readonly productId: string;
    readonly userId: string;
    readonly saleId: string;
    readonly title: string;
    readonly price: number;
    readonly category: string;
    readonly description: string;
    readonly quantity: number;
    readonly createdAt: Date;

    constructor(
        productId: string,
        userId: string,
        saleId: string,
        title: string,
        price: number,
        category: string,
        description: string,
        quantity: number,
        createdAt: Date) {
            if (!title || title === '') {
                throw new Error('Erro ao cadastrar: O titulo é obrigatório.');
            }
            if (!price || price < 0) {
                throw new Error('Erro ao cadastrar: O preço é obrigatório, aceita apenas valores positivos.');
            }
            if (!category || category === '') {
                throw new Error('Erro ao cadastrar: A categoia é obrigatória.');
            }
            if (!quantity || quantity < 0) {
                throw new Error('Erro ao cadastrar: A quantidade é obrigatória e aceita apenas valores positivos.');
            }
            this.productId = productId;
            this.userId = userId;
            this.saleId = saleId;
            this.title = title;
            this.price = price;
            this.category = category;
            this.description = description;
            this.quantity = quantity;
            this.createdAt = createdAt;
        }

        calculateTotal(): number {
            return this.price * this.quantity;
        }

}

export { Product };
