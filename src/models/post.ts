import { Schema, model } from 'mongoose';

const motoAutoSchema = new Schema({
  brand: String,
  model: String,
  vehicleYear: Number,
  engineCapacity: Number,
});

const usersSchema = new Schema(
  {
    firsName: String,
    lastName: String,
    login: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      country: {
        iso: String,
        name: String,
        native: String,
        label: String,
      },
      city: {
        iso: String,
        name: String,
        place_id: String,
        label: String,
        description: String,
      },
    },
    types: {
      type: [String],
      required: true,
    },
    rating: {
      good: {
        type: Number,
        required: true,
      },
      bad: {
        type: Number,
        required: true,
      },
      coefficient: Number,
    },
    moto: [motoAutoSchema],
    auto: [motoAutoSchema],
    admin: Boolean,
    shop: Boolean,
    handMake: Boolean,
    serviceRepair: Boolean,
  },
  { timestamps: true, autoIndex: true },
);
usersSchema.index({ id: 1 });

const Post = model('users', usersSchema);

module.exports = Post;
