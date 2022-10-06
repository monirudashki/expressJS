const {Schema , model , Types} = require('mongoose');


const facilitySchema = new Schema({
    label: {type: String , required: true},
    iconUrl: {type: String},
    accomodations: { type: [Types.ObjectId] , default: [] , ref: 'Accomodation'}
});

const Facility = model("Facility" , facilitySchema);

module.exports = Facility;