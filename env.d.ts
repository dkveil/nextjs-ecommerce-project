declare namespace NodeJS {
    interface ProcessEnv {
        MONGODB_URL: string;
        ACCESS_TOKEN: string;
        REFRESH_TOKEN: string;
    }
}
