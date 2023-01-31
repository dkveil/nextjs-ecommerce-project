import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    title: String,
    percentageDiscount: Number,
    endDate: String,
    usageLimit: {
        type: Boolean,
        default: false
    },
    limit: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Coupons = mongoose.models.coupons || mongoose.model('coupons' , CouponSchema)

export default Coupons