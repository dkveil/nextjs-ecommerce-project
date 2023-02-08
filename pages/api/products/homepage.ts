import { NextApiRequest, NextApiResponse } from 'next';
import Products from '../../../models/productModel';
import connectDB from '../../../utils/connectDB';

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            await getHomepageProducts(req, res);
            break;
    }
};

const getHomepageProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const newestproducts = await Products.find().sort({ _id: -1 }).limit(5);
        const featuredproducts = await Products.find().sort({sold: -1}).limit(5);
        const lastweekproducts = await Products.find({timestamp: { $gte: new Date(new Date().getTime() - 7 * 60 * 69 * 24 * 1000)}})

        res.json({
            newestproducts,
            featuredproducts,
            lastweekproductslength: lastweekproducts.length
        });

    } catch (error) {
        res.status(500).json({ messageid: 'unknowerror' });
    }
};