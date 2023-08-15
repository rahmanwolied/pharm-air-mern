const createError = require('http-errors');
const fs = require('fs');
const slugify = require("slugify")

const { successResponse } = require('./response.controller');
const { findWithId } = require('../services/findItem');

const {createProduct}=require("../services/productService");

const handleCreateProduct =async(req,res,next)=>{
    try{
        const {name,description,price,quantity,shipping} =req.body;
        const image=req.file;

        if(!image){
            throw createError(400,"Image file is required");

        }

        if(image.size>1024*1024*2){
            throw createError(400,"File too large.It must be less than 2 MB");
        }

        const imageBufferString = image.buffer.toString("base64");

        const productData ={
            name,description,price,quantity,shipping,imageBufferString

        }

        const product = await createProduct(productData)

        



        return successResponse(res,{
            statusCode:200,
            message:"product was created successfully",
            payload:product,
        });
    }catch(error){
        next(error);
    }




    }



module.exports = { handleCreateProduct };
