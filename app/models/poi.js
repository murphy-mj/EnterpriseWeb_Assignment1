'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
    name: String,
    category: String,
    description: String,
    image: String,
    location: String
});

poiSchema.statics.findByName = function(name) {
    return this.findOne({ name: name});
};


module.exports = Mongoose.model('Poi', poiSchema);