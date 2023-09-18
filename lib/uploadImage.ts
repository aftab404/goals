import { ID, storage } from "@/appwrite"

export const uploadImage = async (file: File) => {
    if(!file) return

    const fileUploaded = await storage.createFile(
        "65062b718f8c1b31d290",
        ID.unique(),
        file
    )

    return fileUploaded

}
