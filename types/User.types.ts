export interface IUser {
    accessToken?: string;
    data: IUserDetails
}

export interface IUserDetails {
    email: string;
    wishlist: string[];
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    root: boolean;
};