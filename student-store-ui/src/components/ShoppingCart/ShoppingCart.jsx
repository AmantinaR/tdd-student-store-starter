import * as React from "react"
import "./ShoppingCart.css"

export default function ShoppingCart({isOpen, products, shoppingCart}) {
    let total = 0;
    let taxes = (total*0.0875).toFixed(2);
    let final = 0;
    return (
        <div>
        {shoppingCart.length > 0 ?
        <div className="shopping-cart">
        <ul className="shopping-cart-items">
        <li className="list-header"></li>
        {shoppingCart.map((item) => {
            let itemDetails = products.find(element => element.id === item.id);
            total += itemDetails.price*item.quantity;
            taxes = (total*0.0875).toFixed(2)
            final += total
            final += total*0.0875
            return(
                <li key={item.id} className="list-row">
                    <div className="cart-product-name">{itemDetails.name}</div>
                    <div className="cart-product-quantity">{item.quantity}</div>
                    <div className="cart-product-price">${itemDetails.price}</div>
                    <div className="cart-product-subtotal">${itemDetails.price * item.quantity}</div>
                </li>
            )})}
        </ul>
        <ul className="totals">
            <li className="totals-row"><div>Subtotal</div><div>${total}</div></li>
            <li className="totals-row"><div>Taxes and Fees</div><div>${taxes}</div></li>
            <li className="totals-row"><div>Total</div><div>${final.toFixed(2)}</div></li>
        </ul> </div>
        : <div className="notification">"No items added to cart yet. Start shopping now!"</div>}
        </div>
    );
}