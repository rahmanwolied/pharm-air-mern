// const { successResponse} =require("../controllers/response.controller");
const slugify=require('slugify');
const createError = require("http-errors")
const Product = require("../models/product.model")

const createProduct = async (productData) => {
	
    const {name,description,price,quantity,shipping,imageBufferString}= productData;
	    
        
    const productExists= await Product.exists({name:name});
    if(productExists){
        throw createError(
            409,
            "Product with this name already exists"
        );
    }

    const product= await Product.create({
        name:name,
        slug:slugify(name),
        description: description,
        price:price,
        quantity:quantity,
        shipping:shipping,
        image:imageBufferString
    

    })

    return product;

    } 



module.exports={createProduct};

