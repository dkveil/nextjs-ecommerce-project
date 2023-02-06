import { NextApiRequest, NextApiResponse } from 'next';
import Products from '../../../models/productModel';
import connectDB from '../../../utils/connectDB';

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            await getNewestProducts(req, res);
            break;
    }
};

const getNewestProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const featuredproducts = await Products.find().sort({sold: -1}).limit(5);

        res.json({
            featuredproducts,
        });

    } catch (error) {
        res.status(500).json({ messageid: 'unknowerror' });
    }
};
