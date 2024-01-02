import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cart from '../model/Cart.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { verifToken, verifTokenAndAuthorization, verifyTokenAndAdmin } from './verifyToken.js';
const router = express.Router();

// Create
router.post('/:id', verifToken, async (req, res) => {
    try {

        const Cart = await cart.create(req.body)

        res.send(Cart)
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
                $set: req.body
            },
            {
                new: true
            })

        res.send(updateProduct)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


// Find by Id and delete
router.delete('/:id', verifTokenAndAuthorization, async (req, res) => {
    try {
        const userId = req.params.id

        const Cart = await cart.findByIdAndDelete(userId);

        res.send('Product has been deleted..')
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


// get user 


router.get('/find/:id', verifTokenAndAuthorization, async (req, res) => {
    try {

        const Cart = await product.findById(req.params.id);

        res.send(cart)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})

// get All producss
// TODO => find by category and ASC, DSC 
router.get('/', verifTokenAndAuthorization,  async (req, res) => {
    try {
        const Cart = await cart.find();
        res.send(Cart)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


export default router;