import { firestore } from "@/config/firebase";
import { UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

type ResponseType = {
    success: boolean;
    msg: string;
};

export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {
    try {
        // Check if image needs to be uploaded
        if (updatedData.image && typeof updatedData.image === 'object' && updatedData.image.uri) {
            const imageUploadRes = await uploadFileToCloudinary(updatedData.image, "users");

            if (!imageUploadRes.success) {
                return { success: false, msg: imageUploadRes.msg || "Failed to upload image" };
            }

            updatedData.image = imageUploadRes.data; // update image URL after successful upload
        }

<<<<<<< HEAD
=======
        

>>>>>>> 940d709 (Update Code)
        const userRef = doc(firestore, "users", uid);
        await updateDoc(userRef, updatedData);

        return { success: true, msg: "Updated successfully" };
<<<<<<< HEAD
    } catch (error: any) {
=======
    }
    catch (error: any) {
>>>>>>> 940d709 (Update Code)
        console.error("Error updating user:", error);
        return { success: false, msg: error?.message || "Update failed" };
    }
};
