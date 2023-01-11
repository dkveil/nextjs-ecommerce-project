import mongoose from "mongoose";
import langOptions from '../utils/languageOptions'

const ProductSchema = new mongoose.Schema({
    title: {
        [langOptions.POLISH]: {
            type: String,
            required: true,
            trim: true
        },
        [langOptions.ENGLISH]: {
            type: String,
            required: true,
            trim: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
}, {timestamps: true})

const Products = mongoose.models.products || mongoose.model('products' , ProductSchema)

export default Products;