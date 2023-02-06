export const imageUpload = async (images: { image: File, prio: number }[]) => {
    let imagesData = [];

    console.log(images)

    for(const item of images){
        const formData = new FormData()
        formData.append('file', item.image)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET)
        formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_NAME)

        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, {
            method: 'POST',
            body: formData
        })

        const data = await res.json()

        console.log(data)
        imagesData.push({url: data.secure_url, prio: item.prio})
    }

    return imagesData;
}