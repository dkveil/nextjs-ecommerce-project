import mongoose from "mongoose";
import langOptions from '../utils/languageOptions'

const ProductSchema = new mongoose.Schema({
    title: {
        [langOptions.ENGLISH]: {
            type: String,
            required: true,
            trim: true
        },
        [langOptions.POLISH]: {
            type: String,
            required: true,
        }
    },
    price: {
        [langOptions.ENGLISH]: {
            type: Number,
            required: true,
            trim: true
        },
        [langOptions.POLISH]: {
            type: Number,
            required: true,
        }
    },
    predescription: {
        [langOptions.ENGLISH]: {
            type: String,
            required: true
        },
        [langOptions.POLISH]: {
            type: String,
            required: true
        }
    },
    description: {
        [langOptions.ENGLISH]: {
            type: String,
        },
        [langOptions.POLISH]: {
            type: String,
        }
    },
    categoryid: {
        type: String,
        required: true,
        enums: ["tshirt", "hoodie", "shoes"]

    },
    images: {
        type: Array,
        required: true,
        min: 1
    },
    options: {
        type: [{
            title: {
                type: String,
                required: true
            },
            inStock: {
                type: Number,
                default: 0
            }
        }],
        min: 1
    },
    sold: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Products = mongoose.models.products || mongoose.model('products' , ProductSchema)

export default Products;