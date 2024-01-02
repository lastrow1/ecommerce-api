import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import product from '../model/Product.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { verifTokenAndAuthorization, verifyTokenAndAdmin } from './verifyToken.js';
const router = express.Router();



router.post('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { title, desc, img, categories, size, color, price } = req.body;
        console.log("Title:", title);
        console.log("Description:", desc);
        console.log("Image:", img);
        console.log("Categories:", categories);
        console.log("Size:", size);
        console.log("Color:", color);
        console.log("Price:", price);

        const Product = await product.create({ title, desc, img, categories, size, color, price } );

        res.send(Product)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})



// Update Product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { title, desc, img, categories, size, color, price } = req.body;
        const userId = req.params.id
        
        const updateProduct = await product.findByIdAndUpdate(userId, 
            {
                $set:req.body
            },
            {
                new:true
            })

        res.send(updateProduct)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


// Find by Id and delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const userId = req.params.id
        
        const updateProduct = await product.findByIdAndDelete(userId);

        res.send('Product has been deleted..')
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


// get producss
router.get('/find/:id', async (req, res) => {
    try {
        
        const Products = await product.findById(req.params.id);

        res.send(Products)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})

// get All producss
// TODO => find by category and ASC, DSC 
router.get('/', async (req, res) => {
    try {

        const Products = await product.find();
        res.send(Products)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


export default router;