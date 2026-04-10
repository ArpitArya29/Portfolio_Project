import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
export const authMiddleware = async(req, res, next) => {
    try {
        // console.log(req.cookie);
        
        const token = req.cookies.jwtlogintoken;
    
        if(!token) {
            return res.status(400).json({
                message : "Unauthorized! Token not provided"
            });
        }
    
        let decoded;
    
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                message : "failed to  verify login token"
            })
        }

        const user = await db.user.findUnique({
            where : {
                id : decoded.id
            }, select : {
                id : true,
                name : true,
                email : true,
                role : true,
                image : true
            }
        })

        if(!user) {
            return res.status(400).json({
                message : "Wrong or expired login token"
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success : false,
            message : "Error alidating user",
            error
        })
    }
}