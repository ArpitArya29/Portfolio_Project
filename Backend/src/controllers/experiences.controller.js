import { db } from "../libs/db.js";

const parseDate = (date) => {
    if(!date) return undefined

    const parsedDate = new Date(date);

    return isNaN(parsedDate.getTime()) ? null : parsedDate; 
}

const formatToISO = (date) => {
  if (!date) return null;

  return new Date(date).toISOString();
};

export const addExperiences = async(req, res) => {
    try {
        const user = req.user;
        const { experiences } = req.body;

        if(!Array.isArray(experiences) || experiences.length === 0) {
            return res.status(400).json( {
                message : "Experience required to add"
            })
        }        

        const emptyCnt = experiences.reduce( (acc, curr) => (
            (!curr.role || !curr.company || !curr.startDate) ? acc+1 : acc
        ), 0);

        if(emptyCnt > 0) {
            return res.status(400).json( {
                message : "Experience role, company or startdate can't be empty",
                count : emptyCnt
            })
        }

        const formattedExperience = experiences.map( (experience) => {

            const startDate = parseDate(experience.startDate);
            const endDate = parseDate(experience.endDate);
            
            return {
                role : experience.role.trim(),
                company : experience.company.trim(),
                description : experience.description ? experience.description : undefined,
                location : experience.location,
                startDate,
                endDate,
                userId : user.id
        }});

        const createdExperience = await Promise.all(
            formattedExperience.map((exp) => 
                db.experience.create({
                    data : exp
                })
            )
        );

        return res.status(200).json( {
            success : true,
            message : "Experience addedd successfully",
            experiences : createdExperience
        })

    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error adding expreiences",
            error
        })
    }
}


export const updateExperience = async(req, res) => {
    try {
        const userId = req.user.id;
        const experienceId = req.params.id;

        const { role, company, description, startDate, endDate, location } = req.body;

        const existingExperience = await db.experience.findFirst( {
            where : {
                id : experienceId,
                userId
            }
        });
        
        if(!existingExperience) {
            return res.status(400).json( {
                message : "Experience not found"
            })
        }

        if(!role && !company && !description && !startDate && !endDate) {
            return res.status(400).json( {
                message : "Nothing to update"
            })
        }

        const updatedExperience = await db.experience.update( {
            where : {
                id : existingExperience.id
            }, data : {
                ...(role && {role : role.trim()}),
                ...(company && {company : company.trim()}),
                ...(location && {location : location.trim()}),
                ...(description && {description : description}),
                ...(startDate && {startDate : formatToISO(startDate)}),
                ...(endDate && {endDate : formatToISO(endDate)})
            }
        })

        return res.status(200).json( {
            success : true,
            message : "Experience updated successfully",
            updatedExperience
        })

    } catch (error) {
        
        return res.status(500).json( {
            success : false,
            message : "Error updating experience",
            error
        })
    }
}


export const deleteExperience = async(req, res) => {
    try {
        const userId = req.user.id;
        const experienceId = req.params.id;

        const existingExperience = await db.experience.findFirst( {
            where : {
                id : experienceId,
                userId
            }
        });

        if(!existingExperience) {
            return res.status(400).json({
                message : "Experience not found"
            })
        }

        await db.experience.delete( {
            where : {
                id : existingExperience.id
            }
        })

        return res.status(200).json( {
            success : true,
            message : "Experience deleted successfully"
        })

    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error deleting experience",
            error
        })
    }
}


export const getAllExperiences = async(req, res) => {
    try {
        const userId = req.user.id;
        
        const allExperiences = await db.experience.findMany( {
            where : {
                userId
            }
        });

        if(!allExperiences || allExperiences.length === 0) {
            return res.status(404).json({
                message : "Experience not found"
            })
        }

        return res.status(200).json( {
            success : true,
            message : "Experience found successfully",
            experiences : allExperiences
        })

    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error fetching experiences",
            error
        })
    }
}