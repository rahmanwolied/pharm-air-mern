const {body} =require("express-validator");

const validateProduct =[
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Product Name is required.Enter your full name')
    .withMessage("product Name should be at least 3-150 characters long"),
    body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required.Enter your full name')
    .withMessage("Description should be at least 3-150 characters long"),
    body('price')
    .trim()
    .notEmpty()
    .withMessage('Price is required.Enter your full name')
    .withMessage("Price should be at least 3-150 characters long"),
    body('quantity')
    .trim()
    .notEmpty()
    .withMessage('Quantity is required.Enter your full name')
    .isInt({min:1})
    .withMessage("Quantity should be a positive integer"),
];

module.exports ={
    validateProduct
};