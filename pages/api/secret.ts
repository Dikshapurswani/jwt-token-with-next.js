import jwt from "jsonwebtoken";
import {NextApiRequest,NextApiResponse} from 'next';

import * as React from 'react';
import { Component } from 'react';

const KEY="123456";

export default function(req:NextApiRequest,res:NextApiResponse){
    const {token}=req.body;
    const {admin}=jwt.verify(token,KEY) as {[key:string] :string}
    if(admin){
        res.json({secretAdminCode:12345})
    }
    else{
        res.json({admin:false})
    }
}