import { NextApiRequest, NextApiResponse } from "next"
import Products from "../../../models/productModel";
import connectDB from "../../../utils/connectDB";

connectDB()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'GET':
            await getProducts(req, res)
            break;
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const products = await Products.find()

        res.json({
            productsLength: products.length,
            products
        })
    } catch(error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}