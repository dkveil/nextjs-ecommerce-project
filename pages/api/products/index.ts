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
        const { sortby, size, minPrice, maxPrice, lang } = req.query;

        const sortbyFilter = typeof lang !== undefined && sortby === 'popular' ? { sold: -1 } : sortby === 'atoz' ? {["title." + lang]: 1} : sortby === 'ztoa' ? {["title." + lang]: -1} : sortby === 'pricelowtohigh' ? { "price.ENG": 1 } : sortby === 'pricehightolow' ? { "price.ENG": -1 } : { _id: 1}
        const sizeFilter = typeof size === 'string' ? { "options.title": size.split(','), "options.inStock": { $gte: 0 } } : {}

        const priceFilter = {} as { [id: string]: { [id: string] : number }}

        if(minPrice !== null && Number(minPrice) > 0){
            priceFilter[`price.${lang}`] = { $gte: Number(minPrice )}
        }

        if (minPrice !== null && Number(maxPrice) > 0 ) {
            if (priceFilter[`price.${lang}`]) {
                priceFilter[`price.${lang}`].$lte = Number(maxPrice);
                return;
            }

            priceFilter[`price.${lang}`] = { $lte: Number(maxPrice) };
        }

        const products = await Products.find({ ...sizeFilter, ...priceFilter }).sort({...sortbyFilter } as {})

        res.json({
            products
        })
    } catch(error) {
        res.status(500).json({messageid: 'unknowerror'})
    }
}