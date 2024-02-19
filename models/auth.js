const { Mongoose, default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  registered: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  eyeColor: {
    type: String,
    required: true,
  },
  favoriteFruit: {
    type: String,
    required: true,
  },
  company: {
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  tags: [{ type: String, required: true }],
});

const author = mongoose.model("author", authorSchema);

module.exports = author;
