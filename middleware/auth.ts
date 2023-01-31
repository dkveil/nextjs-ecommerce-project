import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import Users from '../models/userModel';

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({err: 'Invalid auth'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
    if(!decoded) return res.status(400).json({err: 'Invalid auth'})

    const user = await Users.findOne({_id: decoded.id})

    return {id: user._id, email: user.email} ;
}

export default auth