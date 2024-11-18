import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

const { CLOUDINARY_CLOUDNAME, CLOUDINARY_APIKEY, CLOUDINARY_APISECRET, NODE_ENV } = process.env;

if (!CLOUDINARY_CLOUDNAME || !CLOUDINARY_APIKEY || !CLOUDINARY_APISECRET) {
    throw new Error('Cloudinary configuration is incomplete');
}

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUDNAME,
    api_key: CLOUDINARY_APIKEY,
    api_secret: CLOUDINARY_APISECRET,
    secure: NODE_ENV === 'production',
});

const uploadOnCloudinary = async (localpath) => {
    try {
        if (!localpath) {
            throw new Error('File is missing');
        }

        // Check if file exists before proceeding to upload
        await fs.access(localpath);
        const response = await cloudinary.uploader.upload(localpath, {
            resource_type: 'auto',
            folder: 'uploads/',
            transformation: [
                { width: 800, height: 800, crop: 'limit' },
            ]
        });

        console.log("File uploaded to Cloudinary", response.url);

        // Delete the local file after successful upload
        await fs.unlink(localpath);
        console.log('Local file has been removed successfully');

        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        //delete files for failed cases also
        try {
            await fs.unlink(localpath);
            console.log('Failed to upload. Local file removed.');
        } catch (unlinkError) {
            console.error('Error removing local file:', unlinkError);
        }

        throw error;
    }
}

const deleteOnCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            console.log('Public ID is missing');
            return;
        }

        const response = await cloudinary.uploader.destroy(publicId);
        console.log("Image deleted successfully", response);
    } catch (error) {
        console.error("Error deleting image", error);
    }
}

export { uploadOnCloudinary, deleteOnCloudinary };
