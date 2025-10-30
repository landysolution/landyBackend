import mongoose from "mongoose";

const pcSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpu: { type: String, required: true },
  gpu: { type: String, required: true },
  ram: { type: String, required: true },
  monitor: { type: String, required: true },
  mouse: { type: String },
  headset: { type: String },
  keyboard: { type: String },
  pricePerHour: { type: Number, required: true },
});
const attributesSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

const cafeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },

    images: {
      type: [String],
      default: [],
    },

    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      district: { type: String, required: true },
    },

    pcs: [pcSchema],

    address: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    attributes: [attributesSchema],
  },

  { timestamps: false },
  { _id: false }
);

const cafeModel = mongoose.model("Cafe", cafeSchema);

export default cafeModel;
