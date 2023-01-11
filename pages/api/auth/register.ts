import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt'

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'POST':
            await register(req, res)
            break;
    }
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 12);

        const userExists = await Users.findOne({email})
        if(userExists) return res.status(400).json({messageid: 'emailalreadyexists'})

        const newUser = new Users({ email, password: passwordHash })

        await newUser.save()
        res.json({messageid: "registersuccess"})

    } catch (error) {
        return res.status(500).json({messageid: "unknowerror"})
    }
}

