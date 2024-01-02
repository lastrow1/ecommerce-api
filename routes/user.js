import express from "express";
import { verifToken, verifTokenAndAuthorization, verifyTokenAndAdmin } from './verifyToken.js'
import bcrypt from 'bcrypt'
import user from "../model/User.js";

const router = express.Router();


router.put('/:id', verifTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    try {
    const User = await user.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            }, 
            { new: true });

            return res.status(200).json({ success: "true", User})

    } catch (error) {
        return res.status(402).json({ success: "false", Error: "Error During Update..." })
    }

})

router.delete('/:id', verifTokenAndAuthorization, async(req, res)=>{
    try {
       
        const User = await user.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: "true", msg: "User Deleted Successfully.." })
        
    } catch (error) {
        return res.status(402).json({ success: "false", Error: "Error During Delete" })
    }
  
})

// Get All users
router.get('/', verifyTokenAndAdmin, async(req, res)=>{
    try {
        const query  = req.query.new;
        if(query === 'true')
        {
            const User = await user.find().sort('-1').select('-password');
            return res.status(200).json({ success: "true", users: User})

        }
        
        const User = await user.find().select('-password');
        return res.status(200).json({ success: "true", users: User})
        
    } catch (error) {
        return res.status(402).json({ success: "false", Error: error.message })
    }
  
})

// Get USer Stats

router.get('/stats', verifyTokenAndAdmin, async(req, res)=>{
    
})

// Get User by id (Only Admin)
router.get('/find/:id', verifyTokenAndAdmin, async(req, res)=>{
    try {
        const User = await user.findById(req.params.id).select('-password');
        return res.status(200).json({ success: "true", User})
        
    } catch (error) {
        return res.status(402).json({ success: "false", Error: "Error During Delete" })
    }
  
})

export default router;