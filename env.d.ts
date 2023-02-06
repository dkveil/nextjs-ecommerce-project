declare namespace NodeJS {
    interface ProcessEnv {
        MONGODB_URL: string;
        ACCESS_TOKEN: string;
        REFRESH_TOKEN: string;
        NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET: string;
        NEXT_PUBLIC_CLOUDINARY_NAME: string;
        NEXT_PUBLIC_CLOUDINARY_API_URL: string
    }
}
