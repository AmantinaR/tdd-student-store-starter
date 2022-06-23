const express = require("express");
const router = express.Router();

const Store = require('../models/store');
const {NotFoundError, BadRequestError} = require('../utils/errors');

router.get("/", async (req, res, next) => {
    try{
        const products = await Store.listProducts();
        res.status(200).json({ products });
        //res.status(200).json({ "ping": "ping" });
    } catch(err) {
        next(err);
    }
}) 

router.get("/:productId", async (req, res, next) => {
    try{
        const productId = req.params.productId;
        const product = await Store.oneProduct(productId);
        if (!product){
            throw new NotFoundError("Product not found!");
        }
        res.status(200).json(product);
    } catch(err) {
        next(err);
    }
}) 

router.post("/", async (req, res, next) => {
    try{
        //check that body has shopping cart and user fields
        
        const purchase = await Store.createPurchase(req.body.user, req.body.shoppingCart);
        res.status(201).json({ purchase });
    } catch(err) {
        next(err);
    }
}) 

module.exports = router;
