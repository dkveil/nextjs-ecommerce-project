import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../middleware/auth";
import Orders from "../../../models/orderModel";
import connectDB from "../../../utils/connectDB";

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id } = req.query;

        const authResult = await auth(req, res) as { id: string }

        const order = await Orders.findOne({_id: id, user: authResult.id})

        res.json({
            order
        })
    } catch (error){
        res.status(500).json({
            messageid: 'unknowerror'
        })
    }
}