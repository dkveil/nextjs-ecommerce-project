import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/connectDB';
import Products from "../../../models/productModel";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'GET':
            await getProduct(req, res)
            break;
    }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id } = req.query;

        const product = await Products.findOne({ id });
        if(!product) return res.status(400).json({messageid: 'product404'})

        res.json({product})
    }
    catch (error) {
        res.status(500).json({messageid: 'uknowerror'})
    }
}