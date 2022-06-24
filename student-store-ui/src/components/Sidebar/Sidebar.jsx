import * as React from "react"
import "./Sidebar.css"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"


export default function Sidebar({receipt, success, error, isOpen, shoppingCart = [], products = [], checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm, handleOnToggle}) {
  let open = isOpen ? " open" : ""
  return (
    <section className={"sidebar" + open}>
      <div className="icon-box">
        <button className="toggle-button" onClick={handleOnToggle}>
          <i className="icon ion-android-arrow-dropright-circle"></i>
        </button>
        {isOpen ? <div><ShoppingCart isOpen={isOpen} products={products} shoppingCart={shoppingCart}/><CheckoutForm isOpen={isOpen} shoppingCart={shoppingCart} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} />{error ?<h4 className="error">{error}: Missing Cart Information</h4>: success && shoppingCart.length == 0 ? <div><h4 className="success">Success!</h4> <Receipt receipt={receipt}/></div> : null}</div> : null}
        
      </div>
    </section>
  )
}

function Receipt({receipt}) {
  return(
    <div className="receipt">
      <p>Showing receipt for {receipt.user.name} available at {receipt.user.email}:</p>
      <ul>
        {receipt.items.map((item)=> {
          return(
            <li key={item.name}>{item.quantity} total {item.name} at a cost of ${item.price} for a total cost of ${item.totalPrice}</li>
          )
        })}
      </ul>
    </div>
  )
}
