import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../utils/connectDB";
import Products from "../../../../models/productModel";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'GET':
            await getCategoryProducts(req, res)
            break;
    }
}

const getCategoryProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { category } = req.query;

        const products = await Products.find({categoryid: category});

        res.json({products})
    }
    catch (error) {
        res.status(500).json({messageid: 'uknowerror'})
    }
}