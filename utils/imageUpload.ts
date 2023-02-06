export const imageUpload = async (images: File[]) => {
    let imagesData = [];

    for(const item of images){
        const formData = new FormData()
        formData.append('file', item)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET)
        formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_NAME)

        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, {
            method: 'POST',
            body: formData
        })

        const data = await res.json()
        imagesData.push(data.secure_url)
    }

    return imagesData;
}