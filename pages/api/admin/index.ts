import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method){
        case 'GET':
            await getAccess(req, res);
            break;
    }
}

const getAccess = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const authResult = await auth(req, res) as { root: boolean, role: string };

        if(!authResult.root && authResult.role !== 'admin'){
            res.json({
                status: 'No permissions'
            })
        }

        res.json({
            status: 'OK'
        })
    } catch (error) {
        res.status(500).json({
            stauts: 'No permissions'
        })
    }
}