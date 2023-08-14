// const { successResponse} =require("../controllers/response.controller");
const slugify=require('slugify');

const category = require("../models/categoryModel")

const createCategory = async (name) => {
	
	    
        
        const newCategory =await category.create({
            name: name,
            slug:slugify(name),
            
        });

        return newCategory;

    } 



module.exports={createCategory};

