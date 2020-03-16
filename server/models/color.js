const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hex: {
        type: Number,
        required: true
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
    group_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Group'
    }
});

module.exports = mongoose.model('Color', colorSchema);
