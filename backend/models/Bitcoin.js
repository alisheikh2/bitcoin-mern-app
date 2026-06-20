const mongoose = require('mongoose');

const bitcoinSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    open: Number,
    high: Number,
    low: Number,
    close: {
        type: Number,
        required: true
    },
    volume: Number,
    predictedClose: { // Yeh field pehle missing tha, ab explicit add kar diya hai
        type: Number,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Bitcoin', bitcoinSchema);