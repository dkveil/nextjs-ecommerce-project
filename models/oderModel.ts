import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    shoppingcart: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    delivered: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const Orders = mongoose.models.orders || mongoose.model('orders' , OrderSchema)

export default Orders