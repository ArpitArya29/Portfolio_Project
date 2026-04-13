import { db } from "../libs/db.js";

export const addProjects = async(req, res) => {
    try {
        const user = req.user;

        const { projects } = req.body;

        if(!Array.isArray(projects) || projects.length === 0) {
            return res.status(400).json({
                message : "Project is required"
            })
        }

        const formattedProject = projects.map( (project) => ({
            title : project.title.trim(),
            description : project.description,
            github_link : project.github_link ? project.github_link : undefined,
            live_link : project.live_link ? project.live_link : undefined,
            userId : user.id
        }))

        const emptyCnt = formattedProject.reduce( (acc, curr) => (
            (!curr.title || !curr.description) ? acc+1 : acc
        ), 0);

        if(emptyCnt > 0) {
            return res.status(400).json({
                message : "Project title or description cannot be empty",
                count : emptyCnt
            })
        }

        const addedProjects = await db.project.createMany({
            data : formattedProject,
            skipDuplicates : true
        })

        return res.status(200).json({
            success : true,
            message : "Projects Added successfully",
            addedProjects
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error adding projects",
            error
        })
    }
}


export const updateProject = async(req, res) => {
    try {
        const userId = req.user.id;
        const projectId = req.params.id;

        const { title, description, github_link, live_link } = req.body;

        const existingProject = await db.project.findFirst( {
            where : {
                id : projectId,
                userId
            }
        });

        if(!existingProject) {
            return res.status(404).json( {
                message : "Project not found"
            })
        }

        if(!title && !description && !github_link && !live_link) {
            return res.status(400).json( {
                message : "Nothing to update"
            })
        }

        const updatedProject = await db.project.update( {
            where : {
                id : existingProject.id
            }, data : {
                ...(title && {title : title.trim()}),
                ...(description && {description : description}),
                ...(github_link && {github_link : github_link}),
                ...(live_link && {live_link : live_link})
            }
        })

        return res.status(200).json({
            success : true,
            message : "Project updated Successfully",
            updatedProject
        })

    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error updating project",
            error
        })
    }
}


export const deleteProject = async(req, res) => {
    try {
        const userId = req.user.id;
        const projectId = req.params.id;

        const existingProject = await db.project.findFirst( {
            where : {
                id : projectId,
                userId
            }
        });

        if(!existingProject) {
            return res.status(404).json( {
                message : "Project not found"
            })
        }

        await db.project.delete({
            where : {
                id : existingProject.id
            }
        });

        return res.status(200).json( {
            success : true,
            message : "Project deleted successfully",
        })
        
    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error deleting project",
            error
        })
    }
}


export const getAllProjects = async(req, res) => {
    try {
        const userId = req.user.id;

        const projects = await db.project.findMany( {
            where : {
                userId
            }
        });

        if(!projects || projects.length === 0) {
            return res.status(404).json({
                message : "Projects does not exist"
            })
        }

        return res.status(200).json( {
            success : true,
            message : "Projects frtched successfully",
            projects
        })

    } catch (error) {
        return res.status(500).json( {
            success : false,
            message : "Error fetching projects",
            error
        })
    }
}