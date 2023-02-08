export interface IUser {
    accessToken?: string;
    data: IUserDetails
}

export interface IUserDetails {
    email?: string;
    wishlist: { productId: string, createdAt: string }[];
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: string;
    root?: boolean;
};