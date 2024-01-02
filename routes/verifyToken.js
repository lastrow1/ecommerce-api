import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

const verifToken = (req, res, next) => {
    try {
        const authHeader = req.headers.token;
        if (!authHeader) {
            return res.status(401).json({ success: "false", Error: "You are not authorize." })
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
            if (err){
               return res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
          });
          
    } catch (error) {
        return res.status(401).json({ success: "false", Error: error.message })
    }

}


const verifTokenAndAuthorization = async (req, res, next) => {
    verifToken(req, res, () => {
        if (req.user.userId === req.params.id || req.user.isAdmin) {
          return  next();
        }
        return res.status(403).json({ success: "false", Error: "you are not allowed to do." })
    })

}


const verifyTokenAndAdmin = async (req, res, next) => {
    verifToken(req, res, () => {
        if (req.user.isAdmin) {
          return  next();
        }
        return res.status(403).json({ success: "false", Error: "you are not allowed to do." })
    })

}
export { verifToken, verifTokenAndAuthorization, verifyTokenAndAdmin };



