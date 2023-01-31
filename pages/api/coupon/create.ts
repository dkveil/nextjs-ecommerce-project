import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/connectDB';
import Coupons from "../../../models/couponModel";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { title, percentageDiscount, endDate, usageLimit, limit } = req.body;

        const newCoupon = new Coupons({
            title,
            percentageDiscount,
            endDate,
            usageLimit,
            limit
        })

        const couponExists = await Coupons.findOne({title: title})

        if(couponExists){
            return res.status(404).json({messageid: 'couponexists'})
        }

        await newCoupon.save()

        res.json({
            messageid: 'success'
        })
    } catch (error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}