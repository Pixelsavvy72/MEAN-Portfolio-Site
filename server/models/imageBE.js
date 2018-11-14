const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  // imageOrder: { type: Number, required: true},
  // imageName: { type: String, required: true},
  // imageDesc: { type: String },
  // imageCat: { type: String, required: true},
  // imageUrl: { type: String, required: true},
  // thumbnailUrl: { type: String }
  imageOrder: { type: Number, required: true, unique: true },
  imageName: { type: String},
  imageDesc: { type: String },
  imageCat: { type: String, required: true },
  imageUrl: { type: String, required: true},
  thumbnailUrl: { type: String }
});

module.exports = mongoose.model('ImageBE', imageSchema, 'images');
