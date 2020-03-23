const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    hex: {
        type: String,
        required: true,
        unique: true
    },
    hue: {
        type: Number,
        required: true
    },
    saturation: {
        type: Number,
        required: true
    },
    lightness: {
        type: Number,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Group'
    }
});

module.exports = mongoose.model('Color', colorSchema);
