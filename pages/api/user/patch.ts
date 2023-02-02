import { NextApiRequest, NextApiResponse } from "next";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";
import bcrypt from 'bcrypt'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const authResult = await auth(req, res) as {id: string};

        const { firstName, lastName, email, phone, currentPassword, newPassword } = req.body;

        const user = await Users.findOne({email});

        if(currentPassword && newPassword){
            const passwordIsMatch = await bcrypt.compare(currentPassword, user?.password);

            if(!passwordIsMatch) return res.status(400).json({messageid: 'wrongcurrentpassword'})

            const sameNewPassword = await bcrypt.compare(newPassword, user?.password);

            if(sameNewPassword) return res.status(400).json({messageid: 'samenewpassword'})

            const newPasswordHash = await bcrypt.hash(newPassword, 12);

            await Users.findOneAndUpdate({_id: authResult.id}, {password: newPasswordHash})
        }

        await Users.findOneAndUpdate({_id: authResult.id}, {firstName, lastName, email, phone})

        res.json({
            messageid: 'success',
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
    } catch(error){
        res.status(500).json({
            messageid: 'unknowerror'
        })
    }
}