import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import user from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const router = express.Router();


// Register User
router.post('/usertest', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        const User = await user.create({
            username,
            email,
            password: hashPassword
        })
        // Send success response to Client
       return res.json({ success: "true", msg: "User created Successfully..." })
    } catch (error) {
        res.status(500).json(error.message)
    }

});





// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password: clientPswd } = req.body;
        const User = await user.findOne({ username });

        if (!User) return res.json({ success: "false", msg: "Please Enter Valid Username and Password." })

        // Decrypt password or Compare user password
        const decodePswd = await bcrypt.compare(clientPswd, User.password);
        if (!decodePswd) {
            return res.json({ success: "false", msg: "Password not Mathed.." })
        }


        //Access Token 
        const accessToken = jwt.sign(
            {
                userId: User._id,
                isAdmin: User.isAdmin
            },
            // Secret
            process.env.ACCESS_SECRET,
            {expiresIn:"3d"}
        )
        // Send Response to client
        const { password, ...other } = User._doc;

        res.json({ others: other, accessToken })
    } catch (error) {
        res.status(500).json(error.message)
    }
})


export default router;