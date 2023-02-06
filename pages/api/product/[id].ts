import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/connectDB';
import Products from "../../../models/productModel";
import auth from '../../../middleware/auth';

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case 'GET':
            await getProduct(req, res);
            break;
        case 'PATCH':
            await updateProduct(req, res);
            break;
        case 'DELETE':
            await deleteProduct(req, res);
            break;
    }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id } = req.query;

        const product = await Products.findOne({ _id: id });

        if(!product) return res.status(400).json({messageid: 'product404'})

        res.json({product})
    }
    catch (error) {
        res.status(500).json({messageid: 'uknowerror'})
    }
}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authResult = await auth(req, res) as { root: boolean, role: string };

        if(!authResult.root && authResult.role !== 'admin'){
            res.json({
                messageid: 'nopermissions'
            })
        }

        const { id } = req.query;

        const product = await Products.findByIdAndDelete({ _id: id });

        if(!product) return res.status(400).json({messageid: 'product404'})

        res.json({
            messageid: 'deleteproductsuccess'
        })
    } catch (error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { id } = req.query;

        const { title, price, predescription, description, categoryid, images, options, sold, slug } = req.body;

        await Products.findOneAndUpdate({_id: id}, { title: title, price: price, predescription: predescription, description: description, categoryid: categoryid, images: images, options: options, sold: sold, slug: slug});
        res.json({
            messageid: 'updateproductsuccess'
        })
    } catch (error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}