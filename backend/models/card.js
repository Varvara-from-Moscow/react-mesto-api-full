const mongoose = require('mongoose');
const { validateURL } = require('../utils/const');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Укажите название картинки'],
    minlength: [2, 'Название должно превышать 2 символа'],
    maxlength: [30, 'Название не должно превышать 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: validateURL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
