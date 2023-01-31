import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/connectDB';
import Coupons from "../../../models/couponModel";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { couponValue } = req.body;

        const currentCoupon = await Coupons.findOne({title: couponValue})

        if(!currentCoupon) return res.json({messageid: 'coupondoesnotexists'})

        if(currentCoupon.usageLimit && currentCoupon.limit === 0) return res.json({messageid: 'expiredcoupon'})

        const couponTime = new Date(currentCoupon.endDate).getTime()
        const currentTime = new Date().getTime();

        if(couponTime - currentTime <= 0) return res.json({messageid: 'expiredcoupon'})

        const { title, percentageDiscount } = currentCoupon

        res.json({
            messageid: 'cuoponsuccess',
            coupon: {
                title,
                percentageDiscount
            }
        })
    } catch (error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}