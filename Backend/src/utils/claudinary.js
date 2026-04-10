import { v2 as claudinary } from "cloudinary";
import fs from "fs";

claudinary.config( {
    cloud_name : process.env.CLAUDINARY_CLOUDNAME,
    api_key : process.env.CLAUDINARY_APIKEY,
    api_secret : process.env.CLAUDINARY_APISECRET
})

export const uploadOnClaudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;

        const response = await claudinary.uploader.upload(localFilePath, {
            folder : "portfolioProject",
            resource_type : "auto"
        });

        console.log("File uploaded successfully", response.url);

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);

        return null;
    }
}