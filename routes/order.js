import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import order from '../model/Order.js'
import { verifToken, verifTokenAndAuthorization, verifyTokenAndAdmin } from './verifyToken.js';
const router = express.Router();

// Create
router.post('/', verifToken, async (req, res) => {
    try {
        const Order = await order.create(req.body)

        res.send(Order)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})



// Update Product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {

        const OrderUpdate = await order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            })

        res.send(OrderUpdate)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


// Find by Id and (delete)
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const userId = req.params.id

        const Order = await order.findByIdAndDelete(userId);

        res.send('Order has been deleted..')
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


// get user 


router.get('/find/:id', verifTokenAndAuthorization, async (req, res) => {
    try {

        const Order = await order.findById(req.params.id);

        res.send(Order)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})

// get All producss
// TODO => find by category and ASC, DSC 
router.get('/', verifTokenAndAuthorization,  async (req, res) => {
    try {
        const Order = await order.find();
        res.send(Order)
    } catch (error) {
        return res.status(400).json({ success: "false", msg: error.message })

    }
})


// Total monthely Income



export default router;