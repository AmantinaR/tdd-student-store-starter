import * as React from "react"
import "./PurchaseGrid.css"


export default function PurchaseGrid({purchases}) {
    return(
        <div className="grid-container">
        <h2>Past Purchases</h2>
        <div className="purchase-grid">
            {purchases.map((purchase) => {
                return(
                   <Receipt receipt={purchase.receipt}/>
                )
            })}
        </div>
        </div>
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