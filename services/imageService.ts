import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";

import axios from 'axios'

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
    file: { uri?: string } | string,
    folderName: string
): Promise<ResponseType> => {
    try {
<<<<<<< HEAD
=======

        if (!file) return { success: true, data: null };
>>>>>>> 940d709 (Update Code)
        if (typeof file === 'string') {
            return { success: true, data: file };
        }

        if (file && file.uri) {
            const formData = new FormData();
            formData.append("file", {
                uri: file.uri,
                type: "image/jpeg", // typo fixed: "iamge" -> "image"
                name: file.uri.split("/").pop() || "file.jpg"
            } as any);

            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // typo fixed: "upload preset" -> "upload_preset"
            formData.append("folder", folderName);

            const response = await axios.post(CLOUDINARY_API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            return { success: true, data: response.data.secure_url };
        }

        return { success: false, msg: "No file provided" }; // more meaningful error if no file
    } catch (error: any) {
        console.error('Got error uploading image:', error);
        return { success: false, msg: error.message || "Could not upload file" };
    }
};

export const getProfileImage = (file: any) => {
    if (file && typeof file === 'string') return file;
    if (file && typeof file === 'object' && file.uri) return file.uri;

    return require('../assets/images/defaultAvatar.png'); // Make sure this path is correct
};
<<<<<<< HEAD
=======


export const getFilePath = (file: any) => {
    if (file && typeof file === 'string') return file;
    if (file && typeof file === 'object' && file.uri) return file.uri;

    return null;

};
>>>>>>> 940d709 (Update Code)
