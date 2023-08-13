const {body} =require("express-validator");

const validateCategory =[
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.Enter your full name')
    .withMessage("Name should be at least 3 characters long")
];

module.exports ={
    validateCategory
};