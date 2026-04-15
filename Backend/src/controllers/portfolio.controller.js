import { db } from "../libs/db.js";

export const createPortfolio = async(req, res) => {
    try {
        const userId = req.user.id;
        const { title, bio, projectIds = [], experienceIds = [], skillIds = [] } = req.body;

        if(!title || !bio) {
            return res.status(400).json( {
                message : "Portfolio Title or Bio is required"
            })
        }

        const existingPortfolio = await db.portfolio.findFirst( {
            where : {
                title,
                userId
            }
        })

        if(existingPortfolio) {
            return res.status(400).json( {
                message : "Same portfolio's title already exist for this user"
            })
        }

        const newPortfolio = await db.portfolio.create( {
            data : {
                title,
                bio,
                userId,

                skills : {
                    ...(skillIds?.length && {
                        connect: skillIds.map( id => ({ id }))
                    })
                },
                
                experiences : {
                    ...(experienceIds?.length && {
                        connect: experienceIds.map( id => ({ id }))
                    }),
                },

                projects : {
                    ...(projectIds?.length && {
                        connect: projectIds.map( id => ({ id }))
                    }),
                }

            }, include : {
                projects : true,
                skills : true,
                experiences : true
            }
        });

        return res.status(200).json( {
            success : true,
            message : "Portfolio created successfully",
            portfolio : newPortfolio
        })

    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error creating portfolio",
            error
        })
    }
}


export const updatePortfolio = async(req, res) => {
    try {
        const userId = req.user.id;
        const portfolioId = req.params.id;

        const { title, bio, addProjectIds = [], deleteProjectIds = [], addExperienceIds = [], deleteExperienceIds = [], addSkillIds = [], deleteSkillIds = [] } = req.body;

        if(!title && !bio && 
            (!addProjectIds || !Array.isArray(addProjectIds) || addProjectIds.length === 0) && 
            (!deleteProjectIds || !Array.isArray(deleteProjectIds) || deleteProjectIds.length === 0) && 
            (!addExperienceIds || !Array.isArray(addExperienceIds) || addExperienceIds.length === 0) && 
            (!deleteExperienceIds || !Array.isArray(deleteExperienceIds) || deleteExperienceIds.length === 0) && 
            (!addSkillIds || !Array.isArray(addSkillIds) || addSkillIds.length === 0) &&
            (!deleteSkillIds || !Array.isArray(deleteSkillIds) || deleteSkillIds.length === 0) ) {
                return res.status(400).json( {
                    message : "Nothing to update"
                })
            }

        const existingPortfolio = await db.portfolio.findFirst( {
            where : {
                id : Number(portfolioId),
                userId
            }
        });

        if(!existingPortfolio) {
            return res.status(400).json({
                message : "Portfolio not found"
            })
        }

        const updatedPortfolio = await db.portfolio.update( {
            where : {
                id : existingPortfolio.id
            }, data : {
                ...( title && { title }),
                ...( bio && { bio }),

                skills : {
                    ...(addSkillIds?.length && {
                        connect: addSkillIds.map( id => ({ id }))
                    }),
                    ...(deleteSkillIds?.length && {
                        disconnect : deleteSkillIds.map( id => ( { id }))
                    }),
                },

                experiences : {
                    ...(addExperienceIds?.length && {
                        connect: addExperienceIds.map( id => ({ id }))
                    }),
                    ...(deleteExperienceIds?.length && {
                        disconnect : deleteExperienceIds.map( id => ( { id }))
                    }),
                },

                projects : {
                    ...(addProjectIds?.length && {
                        connect: addProjectIds.map( id => ({ id }))
                    }),
                    ...(deleteProjectIds?.length && {
                        disconnect : deleteProjectIds.map( id => ( { id }))
                    }),
                }
            }, include : {
                skills : true,
                experiences : true,
                projects : true
            }
        })

        res.status(200).json( {
            success : true,
            message : "Portfolio updates successfully",
            updatedPortfolio
        })

    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error updating portfolio",
            error
        })
    }
}


export const deletePortfolio = async(req, res) => {
    try {
        const userId = req.user.id;
        const portfolioId = req.params.id;

        const existingPortfolio = await db.portfolio.findFirst( {
            where : {
                id : Number(portfolioId),
                userId
            }
        });

        if(!existingPortfolio) {
            return res.status(404).json( {
                message : "Portfolio not found"
            })
        }

        await db.portfolio.delete( {
            where : {
                id : existingPortfolio.id
            }
        })

        return res.status(200).json( {
            success : true,
            message : "Portflio deleted successfully",
        })
        
    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error deleting portfolio",
            error
        })
    }
}


export const getAllPortfolios = async(req, res) => {
    try {
        const userId = req.user.id;

        const allPortfolios = await db.portfolio.findMany( {
            where : {
                userId
            }
        })

        if(!allPortfolios || allPortfolios.length === 0) {
            return res.status(404).json( {
                message : "Portfolio does not exist for this user"
            })
        }

        return res.status(200).json( {
            success : true,
            message : "All portfolios fetched successfully",
            portfolios : allPortfolios
        })

    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error fetching portfolio",
            error
        })
    }
}