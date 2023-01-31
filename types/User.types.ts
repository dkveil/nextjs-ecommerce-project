export interface IUser {
    accessToken?: string;
    data: {
        email: string;
        wishlist: string[];
        role: string;
        root: boolean;
    };
}