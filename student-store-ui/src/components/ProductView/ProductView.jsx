import * as React from "react"
import "./ProductView.css"
import ProductCard from "../ProductCard/ProductCard";

export default function ProductView({product, productId, handleAddItemToCart, handleRemoveItemToCart, shoppingCart}) {
    let quantity = shoppingCart.find(element => element.id == product.id);
    quantity = quantity ? quantity.quantity : 0;
    console.log("product view props", product, shoppingCart, quantity);
    return (<div className="product-view">
        <h1 className="product-id"> Product #{productId}</h1>
        <ProductCard quantity={quantity} product={product} showDescription={true} productId={product.id} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart}></ProductCard>
    </div>);
}