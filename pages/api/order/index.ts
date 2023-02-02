import connectDB from "../../../utils/connectDB";
import Orders from "../../../models/oderModel";
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth';
import { NextApiRequest, NextApiResponse } from "next";
import { IShoppingCartItem } from "../../../types/ShoppingCartItem.types";
import Coupons from "../../../models/couponModel";
import { updateUserWishlist } from "../user/wishlist";
import Users from "../../../models/userModel";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authResult = await auth(req , res) as {id: string, email: string} | undefined;

        const { name, lastName, email, phone, street, city, postcode, shoppingcart, totalPrice, currency, coupon, isUser } = req.body;

        const newOrder = new Orders({
            user: isUser ? authResult?.id : null,
            name,
            lastName,
            email: authResult?.email || email,
            phone,
            street,
            city,
            postcode,
            shoppingcart,
            totalPrice,
            currency,
            coupon
        })

        shoppingcart.filter((item: IShoppingCartItem) => {
            const { _id: id, quantity, size } = item;

            return updateProduct({id, quantity, size})
        })

        if(isUser && authResult){
            updateWishlist(authResult.id, shoppingcart)
        }

        if(coupon){
            updateCoupon({title: coupon})
        }

        await newOrder.save().catch((err: Error) => {
            res.status(500).json({messageid: 'unknowerror'})
        });

        res.json({
            messageid: 'success',
        })
    } catch (error) {
        return res.status(500).json({messageid: 'unknowerror'});
    }
}

interface IUpdateProduct {
    id: string,
    quantity: number,
    size: string
}

const updateProduct = async ({id, quantity, size}: IUpdateProduct) => {
    await Products.updateOne({_id: id, 'options.title': size},{
        $inc: { 'options.$.inStock': -quantity, sold: +quantity}
    })
}

const updateCoupon = async ({title}: {title: string}) => {
    const currentCoupon = await Coupons.findOne({title})

    if(!currentCoupon.usageLimit) return;

    await Coupons.updateOne({title}, {
        limit: currentCoupon.limit - 1
    })
}

const updateWishlist = async (id: string, shoppingcart: IShoppingCartItem[]) => {
    const user = await Users.findOne({_id: id});

    const filteredWishlist = user.wishlist.filter((wishlistItem: {productId: string}) => !shoppingcart.some(item => item._id === wishlistItem.productId));

    await Users.findOneAndUpdate({ _id: id }, { $set: { wishlist: filteredWishlist } })
}