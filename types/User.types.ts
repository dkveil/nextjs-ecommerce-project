export interface IUser {
    accessToken?: String;
    data: {
        email: string;
        wishlist: string[];
        role: string;
        root: boolean;
    };
}