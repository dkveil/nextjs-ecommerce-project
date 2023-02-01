import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken';

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'POST':
            await login(req, res)
            break;
    }
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({email})
        const passwordIsMatch = await bcrypt.compare(password, user?.password)

        if(!user || !passwordIsMatch) return res.status(400).json({messageid: 'incorectdata'})

        const accessToken = createAccessToken({id: user._id})
        const refreshToken = createRefreshToken({id: user._id})

        res.json({
            messageid: 'loginsuccess',
            refreshToken,
            accessToken,
            data: {
                email: user.email,
                wishlist: user.wishlist,
                role: user.role,
                root: user.root,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            }})
    } catch (error) {
        return res.status(500).json({messageid: "unknowerror"})
    }
}