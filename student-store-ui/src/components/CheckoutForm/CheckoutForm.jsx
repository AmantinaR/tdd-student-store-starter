import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm({isOpen, shoppingCart, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm}) {
    return (<div className="checkout-form">
        <h2>Payment Info</h2>
        <input type="email" name="email" placeholder="student@codepath.org" value={checkoutForm.email} onChange={(event) => {handleOnCheckoutFormChange(event.target.name, event.target.value)}} />
        <input type="text" name="name" placeholder="Student Name" value={checkoutForm.name} onChange={(event) => {handleOnCheckoutFormChange(event.target.name, event.target.value)}} />
        <button type="submit" onClick={handleOnSubmitCheckoutForm}>Checkout</button>
    </div>);
}