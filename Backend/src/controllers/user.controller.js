import { db } from "../libs/db.js";
import { uploadOnClaudinary } from "../utils/claudinary.js";

export const updateProfile = async(req, res) => {
    try {
        const userId = req.user.id;

        const existingUser = await db.user.findUnique({
            where: {
                id : userId
            }
        });

        if(!existingUser) {
            return res.status(400).json({
                messsage : "User not found"
            })
        }

        const {name, linkedIn_url, github_url, phone_number} = req.body;
        
        if(
            (name === undefined || name === existingUser.name) &&
            (linkedIn_url === undefined || linkedIn_url === existingUser.linkedIn_url) && 
            (github_url === undefined || github_url === existingUser.github_url) &&
            (phone_number === undefined || phone_number === existingUser.phone_number) &&
            !req.file
        ) {
            return res.status(400).json({
                messsage : "Nothing to change"
            })
        }

        let imagePath;
        if(req.file) {
            imagePath = await uploadOnClaudinary(req.file.buffer);
        }

        const updatedUser = await db.user.update({
            where : {
                id : existingUser.id
            }, data : {
                ...(name !== undefined && { name : name.trim() }),
                ...(linkedIn_url !== undefined && { linkedIn_url : linkedIn_url }),
                ...(github_url !== undefined && { github_url : github_url }),
                ...(phone_number !== undefined && { phone_number : phone_number }),
                ...(imagePath !== undefined && { image : imagePath.url }),

            }
        })

        res.status(200).json({
            success : true,
            message : "Profile updated successfully",
            user : updatedUser
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : " Error updating user",
            error
        })
    }
}