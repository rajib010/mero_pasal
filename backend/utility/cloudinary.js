import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import {configDotenv} from 'dotenv'
configDotenv()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {  
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });

    return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil }


