const { Schema, model ,Types} = require("mongoose");

const accomodationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  beds: { type: Number, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String , required: true },
  facilities: { type: [Types.ObjectId], default: [], ref: 'Facility' },
});

const Accomodation = model("Accomodation" , accomodationSchema);

module.exports = Accomodation;