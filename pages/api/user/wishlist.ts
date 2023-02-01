import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../middleware/auth";
import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'GET':
            await getWishlistItems(req, res)
            break;
        case 'PATCH':
            await updateUserWishlist(req, res);
            break;
    }
}

export const getWishlistItems = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const authResult = await auth(req, res) as {id: string };

        const { wishlist } = await Users.findOne({_id: authResult.id})

        console.log(wishlist)

        res.json({
        })

    } catch(error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}
export const updateUserWishlist = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const authResult = await auth(req, res) as {id: string };

        const { type, id: productId } = req.body;

        const wishlistItemExists = await Users.findOne({ _id: authResult.id, wishlist: { $elemMatch: { productId } } }, { "wishlist.$": 1 })

        if(type === 'add'){
            if(wishlistItemExists){
                return res.json({
                    messageid: 'wishlistitemexists'
                })
            }

            const wishlistitem = {
                productId,
                createdAt: new Date().toISOString()
            }

            await Users.findOneAndUpdate({_id: authResult.id},
                {$push: {wishlist: wishlistitem }
            })

            res.json({
                messageid: 'addedtowishlist',
                wishlistitem
            })
        }
        if(type === 'remove'){
            if(!wishlistItemExists){
                return res.json({
                    messageid: 'wishlistitemdoesnotexists'
                })
            }

            await Users.findOneAndUpdate({_id: authResult.id},
                {$pull: {wishlist: { productId }}
            })

            res.json({
                messageid: 'removedfromwishlist',
            })
        }
    } catch(error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}