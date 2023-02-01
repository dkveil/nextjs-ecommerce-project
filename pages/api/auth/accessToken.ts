import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import jwt, {JwtPayload} from 'jsonwebtoken'
import Users from "../../../models/userModel";
import { createAccessToken } from "../../../utils/generateToken";

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.status(400).json({messageid: 'pleaselogin'})

        const result = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
        if(!result) return res.status(400).json({messageid: 'pleaselogin'})

        const user = await Users.findById(result.id)
        if(!user) return res.status(400).json({message: 'userdoesntexists'})

        const accessToken = createAccessToken({id: user._id})
        res.json({
            accessToken,
            data: {
                email: user.email,
                wishlist: user.wishlist,
                role: user.role,
                root: user.root,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            }
        })
    } catch {
        res.status(500).json({messageid: 'unknowerror'})
    }
}