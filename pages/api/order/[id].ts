import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../middleware/auth";
import Orders from "../../../models/orderModel";
import connectDB from "../../../utils/connectDB";

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id: orderId } = req.query;

        const authResult = await auth(req, res) as { id: string, role: string, root: boolean }

        let order;

        if(authResult.role === 'admin' && authResult.root){
            order = await Orders.findOne({_id: orderId})
        } else {
            order = await Orders.findOne({_id: orderId, user: authResult.id})
        }

        res.json({
            order
        })
    } catch (error){
        res.status(500).json({
            messageid: 'unknowerror'
        })
    }
}