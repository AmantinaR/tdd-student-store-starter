import * as React from "react"
import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({products, shoppingCart, handleAddItemToCart, handleRemoveItemToCart}) {
    
    return (<div className="product-grid">
        {products.map((product) => {
            let quantity = shoppingCart.find(element => element.id === product.id);
            quantity = quantity ? quantity.quantity : 0
            return <div key={product.id} className="card-container"><ProductCard shoppingCart={shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart} quantity={quantity} showDescription={false} product={product} productId={product.id}/></div>
        })}
    </div>);
}