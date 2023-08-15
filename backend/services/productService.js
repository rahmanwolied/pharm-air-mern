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

    } ;

const getProducts = async (page=1,limit=4,filter={})=>{
    const products = await Product.find(filter)
       .populate('category')
       .skip(page -1) * limit
       .limit(limit)
       .sort({createAt: -1});

       if(!products)throw createError(404,"no products found");

       const count = await Product.find(filter).countDocuments();
       return { products,count,totalPages:Math.ceil(count/limit),currentPage:page};
};

const getProductBySlug = async (slug)=>{
       const product = await Producct.findOne({slug}).populate("category")

       if(!products)throw createError(404,"no products found");

       return product;
};

const deleteProductBySlug = async (slug)=>{
       const product = await Producct.findOneAndDelete({slug})

       if(!products)throw createError(404,"no products found");

       return product;
};

const updateProductBySlug = async (slug,updates,image,updateOptions)=>{
    
    

    if(updates.name){
        updates.slug = slugify(updates.name);
    }



    
     if(image){
        if(image.size>1024*1024*2){
            throw new Error("file too large")
        }
        updates.image.buffer.toString("base64");
     }

    const updatedProduct =await Product.findOneAndUpdate(
        {slug},
        updates,
        updateOptions
    );
    
    if(!updatedProduct ){
        throw createError(404,"Product with ID does not exist");

    }

    return updatedProduct;

};





module.exports={createProduct,getProducts,getProductBySlug,deleteProductBySlug,updateProductBySlug};

