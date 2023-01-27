import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/connectDB';
import Products from "../../../models/productModel";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'GET':
            await getProducts(req, res)
            break;
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { values } = req.query;

        const currentLanguage = values && values[0] as 'PL' | 'ENG';
        const searchValue = values && values[1] as string;

        if(!currentLanguage || !searchValue){
            return;
        }

        const products = await Products.find().sort({ _id: -1 });

        const filteredProducts = products.filter(item => {
            if(item.title[currentLanguage].toLowerCase().includes(searchValue.toLowerCase())){
                return item;
            }
            return null;
        })

        res.json({products: filteredProducts})
    }
    catch (error) {
        res.status(500).json({messageid: 'uknowerror'})
    }
}