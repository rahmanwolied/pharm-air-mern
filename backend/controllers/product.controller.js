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


const handleGetProducts =async(req,res,next)=>{
    
   try{

    const page= parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 4;
    
    const productsData =await getProducts(page,limit); 

   
    return successResponse(res,{
        statusCode:200,
        message:"returned all the products",
        payload: {
                  products:productsData.products,
                  pagination:{
                    totalPages: productsData.totalPages,
                    currentPage:productsData.currentPage,
                    previousPage:productsData.currentPagep-1,
                    nextPage:productsData.currentPage+1,
                    totalNumberOfProducts:productsData.count,
                  },
        },
    });
} catch (error){
    next(error);
}


}
const handleGetProduct =async(req,res,next)=>{
    
   try{

    const {slug} = req.params;

    const product = await getProductBySlug(slug);
    
    return successResponse(res,{
        statusCode:200,
        message:"returned single product",
        payload: {product},
        
    });
} catch (error){
    next(error);
}


}




module.exports = { handleCreateProduct,handleGetProducts,handleGetProduct };
