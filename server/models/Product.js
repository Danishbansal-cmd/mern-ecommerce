const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    image : String,
    title : String,
    description : String,
    Category : String,
    brand : String,
    price : Number,
    salePrice : Number,
    totalStock : Number
},{timeStamps : true});

module.exports = mongoose.model('Product', ProductSchema);