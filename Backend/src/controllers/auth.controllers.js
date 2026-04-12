import { db } from "../libs/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadOnClaudinary } from "../utils/claudinary.js";

dotenv.config()

export const register = async(req, res) => {
    const {name, email, password} = req.body;

    console.log(name, email, password);
    
    try {
        const existingUser = await db.user.findUnique({
            where : {email}
        })

        if(existingUser) {
            return res.status(400).json({
                message : "User already exists"
            })
        }

        let imagePath;
        if(req.file) {
            imagePath = await uploadOnClaudinary(req.file.path);
        }

        console.log(process.env.HASHSALT);
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data : {
                name,
                email,
                password : hashedPassword,
                image : imagePath.url,
            }
        })

        console.log(newUser);
        

        return res.status(200).json({
            success : true,
            message : "User Registered Successfully",
            user : newUser
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "User Registration failed",
            error
        })
    }
    
}


export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await db.user.findUnique({
            where: {email}
        })

        if(!existingUser) {
            return res.status(400).json({
                message : "Invalid Credentials"
            });
        }

        const isPasswordmatch = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordmatch) {
            return res.status(400).json({
                message : "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {id:existingUser.id},
            process.env.JWT_SECRET,
            {expiresIn:"2d"}
        );

        res.cookie("jwtlogintoken", token, {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!=="development",
            maxAge:1000*60*60*24*2 
        })

        return res.status(200).json({
            success : true,
            message : "User Logged-In",
            user : {
                id : existingUser.id,
                name : existingUser.name,
                role : existingUser.role,
                image : existingUser.image
            }
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error occured while login",
            error
        })
    }
}


export const logout = async(req, res) => {
    try {
        res.clearCookie("jwtlogintoken",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!=="development",
        })

        res.status(200).json({
            success:true,
            message: "User Logged-out Successfully"
        })
    } catch (error) {
        return res.status(404).json({
            error:"Failed to logging-out the user"
        })
    }
}


export const check = async(req, res) => {
    try {
        return res.status(200).json({
            success : true,
            message : "user is logged-in",
            user : req.user,
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error checking user",
            error
        })
    }
}