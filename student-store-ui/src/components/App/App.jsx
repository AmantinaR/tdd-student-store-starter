import * as React from "react"
import { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import ProductView from "../ProductView/ProductView"
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound"
import "./App.css"
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
  useResolvedPath
} from "react-router-dom";
import axios from "axios"


export default function App() {
  //state variables
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [isFetching, setFetching] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({email: "", name: ""});
  const [success, setSuccess] = useState(false);
  const [receipt, setReceipt] = useState({});


  useEffect(() => {
    axios.get('http://localhost:3001/store').then(function(response) {
      if(response) {
        if(searchValue) {
          setProducts(response.data.products.filter((product) => product.name.toLowerCase().includes(searchValue) && (product.category === filter.toLowerCase() || filter === "All Categories")));
        } else {
          setProducts(response.data.products.filter((product) => (product.category === filter.toLowerCase() || filter === "All Categories")));
        }
      } else {
        setError("No products found from API");
      }
    }).catch(function(error) {
      setError(error);
    })
  }, [searchValue, filter])

  //on change, filter products
  function onSearchChange(evt) {
    setSearchValue(evt.target.value);
    //consider changing products here? 
    //setProducts(products.filter((product) => product.name.includes(evt.target.value)));
  }

  function onFilterClick(evt) {
    setFilter(evt.target.textContent);
    console.log(filter);
    //evt.target.classList.add("active");
  }

  function handleOnToggle(evt) {
    console.log(isOpen);
    let opposite = !isOpen;
    console.log(opposite);
    setIsOpen(opposite);
    console.log("toggled", isOpen);
  }

  function handleAddItemToCart(productId) {
    if(shoppingCart.some(obj => obj.id === productId)) {
      //let item = shoppingCart.filter(obj => obj.id === productId)[0];
      const index = shoppingCart.findIndex(object => object.id === productId);
      let item = shoppingCart[index];
      item.quantity++;
      setShoppingCart([...shoppingCart.slice(0, index), item, ...shoppingCart.slice(index+1, shoppingCart.length)]);
      console.log("shoppingCart", shoppingCart);
    } else {
      setShoppingCart(shoppingCart => [...shoppingCart, {id: productId, quantity: 1}]);
      console.log("shoppingCart", shoppingCart);
    }
    
  }

  function handleRemoveItemToCart(productId) {
    if(shoppingCart.some(obj => obj.id === productId)) {
      //let item = shoppingCart.filter(obj => obj.id === productId)[0];
      const index = shoppingCart.findIndex(object => object.id === productId);
      let item = shoppingCart[index];
      item.quantity--;
      if (item.quantity === 0) {
        setShoppingCart([...shoppingCart.slice(0, index), ...shoppingCart.slice(index+1, shoppingCart.length)]);
        console.log("shoppingCart", shoppingCart);
      } else {
        setShoppingCart([...shoppingCart.slice(0, index), item, ...shoppingCart.slice(index+1, shoppingCart.length)]);
      }
    } else {
      return;
    }
  }

  function handleOnCheckoutFormChange(name, value) {
    console.log("checkout form change", name, value);
    setCheckoutForm({...checkoutForm, [name]: value});
  }

  function handleOnSubmitCheckoutForm() {
    //backend
    axios.post("http://localhost:3001/store", {user: checkoutForm, shoppingCart: shoppingCart}).then(function(response) {
      setReceipt(response.data.purchase.receipt);
      console.log(response.data.purchase.receipt);
      setShoppingCart([]);
      setCheckoutForm({email: "", name: ""});
      setSuccess(true);
      setError();
    }).catch(function(error) {
      setError(error.message);
      console.log(error);
    })
  }

  
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="horizontal">
          <Sidebar receipt={receipt} success={success} error={error} handleOnToggle={handleOnToggle} isOpen={isOpen} shoppingCart={shoppingCart} products={products} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}/>
          <Routes>
            <Route path="/" element={<main>
            <Home shoppingCart={shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart} filter={filter} onFilterClick={onFilterClick} products={products} searchValue={searchValue} onSearchChange={onSearchChange}/>
          </main>}/>
          <Route path="/products/:productId" element={<ProductDetail products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart} shoppingCart={shoppingCart}/>}/>
          <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
        
        
      </BrowserRouter>
    </div>
  )
}
