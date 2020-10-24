import {NextApiRequest,NextApiResponse} from 'next';
import jwt from 'jsonwebtoken';

const KEY="123456";

export default function(req:NextApiRequest,res:NextApiResponse){
    if(!req.body){
        res.statusCode=404;
        res.end("Error!");
        return
    }
    const {username,password }=req.body;
   
    const token=jwt.sign({username,admin:username=="admin" && password=="admin"},KEY);
    res.json({token});
}