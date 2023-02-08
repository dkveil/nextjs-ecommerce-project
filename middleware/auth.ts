import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload} from 'jsonwebtoken';
import Users from '../models/userModel';
import connectDB from "../utils/connectDB";

interface JwtPayloadExtended extends JwtPayload {
    id: string
}

connectDB()

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({err: 'Invalid auth'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
    if(!decoded) return res.status(400).json({err: 'Invalid auth'})

    const user = await Users.findOne({_id: (decoded as JwtPayloadExtended).id})

    return {id: user._id, email: user.email, role: user.role, root: user.root} ;
}

export default auth