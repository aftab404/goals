import { storage } from "@/appwrite"

const getImageUrl = async (image: Image) => {
    console.log(image.bucketId, image.fileId)
    const url = await storage.getFilePreview(image.bucketId, image.fileId)

    return url
}

export default getImageUrl