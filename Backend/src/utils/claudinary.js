import { v2 as claudinary } from "cloudinary";
import fs from "fs";

claudinary.config( {
    cloud_name : process.env.CLAUDINARY_CLOUDNAME,
    api_key : process.env.CLAUDINARY_APIKEY,
    api_secret : process.env.CLAUDINARY_APISECRET
})

export const uploadOnClaudinary = async(fileBuffer) => {
    try {
        if(!fileBuffer) return null;

        // const response = await claudinary.uploader.upload(localFilePath, {
        //     folder : "portfolioProject",
        //     resource_type : "auto"
        // });

        const response = await new Promise((res, rej) => {
            const stream = claudinary.uploader.upload_stream(
                { 
                    folder : "portfolioProject", 
                    resource_type : "auto" 
                },
                (error, result) => {
                    if(error) rej(error);
                    else res(result);
                }
            )

            stream.end(fileBuffer);
        })

        return response;
    } catch (error) {
        console.log("Cloudinary upload failed", error);
        
        return null;
    }
}