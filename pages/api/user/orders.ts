import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
import Orders from "../../../models/orderModel";

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'GET':
            await getUserOrders(req, res)
            break;
    }
}
export const getUserOrders = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const authResult = await auth(req, res) as {id: string}

        const orders = await Orders.find({user: authResult.id}).sort({_id: -1})

        res.json({
            orders
        })
    } catch (error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}