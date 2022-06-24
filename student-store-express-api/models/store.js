const { BadRequestError, NotFoundError } = require("../utils/errors")
const { storage } = require("../data/storage")

class Store{
    static async listProducts() {
        // list all items in the transactions array
        const products = storage.get("products").value();
        return products;
    }

    static async oneProduct(productId) {
        const product = storage.get("products").find({id: Number(productId)}).value();
        return product;
    }

    static async listPurchases() {
        // list all items in the transactions array
        const purchases = storage.get("purchases").value();
        return purchases;
    }

    static async createPurchase(user, shoppingCart) {
        if(!shoppingCart || !user.name || !user.email){
            throw new BadRequestError("Invalid request, user or shoppingCart missing")
        }
        let total = 0;
        const products = await Store.listProducts();
        const purchases = await Store.listPurchases();
        const purchaseId = purchases.length + 1;
        const createdAt = new Date().toISOString();
        const receipt = {user: user, items: []};
        shoppingCart.forEach((item) => {
            if(!item.id || !item.quantity){
                throw new BadRequestError("Invalid request, item id or quantity missing")
            }
            const productDetails = products.find(product => product.id === item.id);
            total += productDetails.price * item.quantity
            receipt.items.push({name: productDetails.name, quantity: item.quantity, price: productDetails.price.toFixed(2), totalPrice: (productDetails.price*item.quantity).toFixed(2)})
        })
        //calculate total cost, add tax, create new purchase object
        total += total*0.0875;
        let newPurchase = {id: purchaseId, name: user.name, email: user.email, order: shoppingCart, total: total, createdAt: createdAt, receipt: receipt};
        storage.get("purchases").push(newPurchase);
        return newPurchase;
    }
}

module.exports = Store;