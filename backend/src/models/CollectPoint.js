const { Schema, model } = require('mongoose');

const CollectPointSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model('CollectPoint', CollectPointSchema);