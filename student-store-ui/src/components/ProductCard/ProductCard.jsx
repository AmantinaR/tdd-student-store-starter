import * as React from "react"
import "./ProductCard.css"
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom"

export default function ProductCard({product, showDescription, productId, quantity, handleAddItemToCart, handleRemoveItemToCart}) {
    function formatPrice(price) {
        return price.toFixed(2);
    }

    return (<div className="product-card">
        <div className="media">
            <Link to={"/products/" + product.id}>
                <img src={product.image} alt={product.description} className="product-img"/>
            </Link>
        </div>
        <div className="product-card-details">
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">${formatPrice(product.price)}</p>
            {showDescription ? <p className="product-description">{product.description}</p> : null}
            <div className="button-row">
                <button className="add" onClick={() => {handleAddItemToCart(productId)}}>+</button>
                <button className="remove" onClick={() => {handleRemoveItemToCart(productId)}}>-</button>
                {quantity ? <div className="product-quantity">{quantity}</div> : null}
            </div>
            
        </div>
        

    </div>);
}