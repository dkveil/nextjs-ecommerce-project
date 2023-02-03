import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: String,
        default: ''
    },
    orderNumber: {
        type: Number,
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

OrderSchema.pre('save', function (next) {
  const order = this;
  Orders.find({})
    .sort({ orderNumber: -1 })
    .limit(1)
    .exec((err, orders) => {
      if (err) {
        return next(err);
      }
      order.orderNumber = orders.length > 0 ? orders[0].orderNumber + 1 : 1;
      next();
    });
});

const Orders = mongoose.models.orders || mongoose.model('orders' , OrderSchema)

export default Orders