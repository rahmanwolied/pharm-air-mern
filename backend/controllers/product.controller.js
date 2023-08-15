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
    const search = req.query.search || "";
    const page= parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 4;
    


    const searchRegExp = new RegExp(".*"+search+".*","i");

    const filter ={
        $or:[
            {name:{regex : searchRegExp}},
        ]
    };











    const productsData =await getProducts(page,limit,filter); 

   
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

const handleDeleteProduct =async(req,res,next)=>{
    
   try{

    const {slug} = req.params;

    const product = await deleteProductBySlug(slug);
    
    return successResponse(res,{
        statusCode:200,
        message:"deleted single product",
        
        
    });
} catch (error){
    next(error);
}
}
const handleUpdateProduct =async(req,res,next)=>{
    
   try{

    const {slug} = req.params;
    const updateOptions ={new:true,runValidators:true,context:"query"};

    let updates={};
    const allowedFields=["name","description","price","quantity","shipping"]
    
    for (const key in req.body){
        if (allowedFields.includes(key)){
            updates[key]=req.body[key];

        }
    }

    const image =req.file;
    
    const updatedProduct = await updateProductBySlug(slug,updates,image,updateOptions)







    
    return successResponse(res,{
        statusCode:200,
        message:"deleted single product",
        
        
    });
} catch (error){
    next(error);
}


}


}

module.exports = { handleCreateProduct,handleGetProducts,handleGetProduct,handleDeleteProduct,handleUpdateProduct};
