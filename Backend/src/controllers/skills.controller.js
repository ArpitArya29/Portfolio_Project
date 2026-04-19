import { db } from "../libs/db.js";

export const addSkills = async(req, res) => {
    try {
        const user = req.user;

        const { skills } = req.body;

        if(!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({
                message : "Fields required"
            })
        }

        const formattedSkills = skills.map( (skill) => ({
            name : skill.name.trim().toLowerCase(),
            proficiency : Number(skill.proficiency),
            userId : user.id
        }));

        const createdSkills = await Promise.all(
            formattedSkills.map((skill) =>
                    db.skill.create({
                    data: skill,
                })
            )
        );

        return res.status(200).json({
            success : true,
            message : "Skills added successfully",
            skills : createdSkills
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Failed adding skills"
        })
    }
}


export const updateSkill = async(req, res) => {
    try {
        const userId = req.user.id;
        const skillId = Number(req.params.id);

        console.log(userId, skillId);
        

        const {name, proficiency} = req.body;

        console.log(name, proficiency);
        

        const skill = await db.skill.findFirst({
            where : {
                id : skillId,
                userId
            }
        })

        console.log(skill);
        
        
        if(!skill) {
            return res.status(404).json({
                message : "Skill not found"
            })
        }

        if(!name && !proficiency) {
            return res.status(400).json({
                message : "Nothing to update"
            })
        }

        const updatedSkill = await db.skill.update({
            where : {
                id : skill.id
            }, data : {
                ...( name!==undefined && { name : name.trim().toLowerCase() }),
                ...( proficiency!==undefined && { proficiency: Number(proficiency) })
            }
        })

        return res.status(200).json({
            success : true,
            message : "Skill updated successfully",
            updatedSkill
        });

    } catch (error) {
        console.log("Error updating skills", error);
        
        return res.status(500).json({
            success : false,
            message : "Error updating skill",
            error
        })
    }
}


export const deleteSkill = async(req, res) => {
    try {
        const userId = req.user.id;
        const skillId = Number(req.params.id);

        const skill = await db.skill.findFirst({
            where : {
                id : skillId,
                userId
            }
        })

        if(!skill) {
            return res.status(404).json({
                message : "Skill not found"
            })
        }

        await db.skill.delete({
            where : {
                id : skillId
            }
        })

        return res.status(200).json({
            success : true,
            message : "Skills deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error deleting skills",
            error
        })
    }
}


export const getAllSkills = async(req, res) => {
    try {
        const userId = req.user.id;

        const skills = await db.skill.findMany({
            where : {
                userId
            }, orderBy : {
                createdAt : "desc"
            }
        });

        if(!skills || skills.length === 0) {
            return res.status(404).json({
                message : "Skills not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Skills Fetched Successfully",
            skills
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Failed fetching skills",
            error
        })
    }
}