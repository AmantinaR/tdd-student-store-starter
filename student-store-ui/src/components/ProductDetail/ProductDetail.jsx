import * as React from "react"
import {useState, useEffect} from "react"
import {useParams} from 'react-router-dom';
import "./ProductDetail.css"
import Logo from "../Logo/Logo";
import ProductView from "../ProductView/ProductView";
import axios from "axios";

export default function ProductDetail({handleAddItemToCart, handleRemoveItemToCart, shoppingCart}) {
    const [product, setProduct] = useState();
    const [isFetching, setFetching] = useState(true);
    let { productId } = useParams();
    //console.log(productId)
    useEffect(() => {
        axios.get("http://localhost:3001/store/" + productId).then(function(response) {
            setProduct(response.data);
            //console.log(response.data)
            setFetching(false);
        }).catch(function(error) {
            console.log(error.message);
        })
    }, []);
    return (<div className="product-detail">
        {isFetching ? <h4>Loading...</h4> : 
        <ProductView shoppingCart={shoppingCart} product={product} productId={productId} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart}></ProductView>}
    </div>);
}