const { Schema, model } = require("mongoose");

const PaymentSchema = new Schema({
    group: {
        type: 'ObjectId',
        ref: 'Group',
        required: true
    },

    from: {
        type: 'ObjectId',
        ref: 'User',
        required: true
    },

    to: {
        type: 'ObjectId',
        ref: 'User',
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const PaymentModel = model("Payment", PaymentSchema)

module.exports = PaymentModel;