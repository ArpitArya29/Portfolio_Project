import { db } from "../libs/db.js";

export const getPortfolioById = async(req, res) => {
    try {
        const portfolioId = req.params.id;

        const portfolio = await db.portfolio.findUnique( {
            where : {
                publicId : portfolioId
            }, include : {
                skills : true,
                experiences : true,
                projects : true,
                user : {
                    select : {
                        name : true,
                        email : true,
                        image : true
                    }
                }
            }
        })

        if(!portfolio) {
            return res.status(400).json( {
                message : "Portfolio does not exist"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Portfolio fetched successfully",
            portfolio
        })

    } catch (error) {
        res.status(500).json( {
            success : false,
            message : "Error fetching portfolio",
            error
        })
    }
}