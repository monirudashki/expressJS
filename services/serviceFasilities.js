const Accomodation = require('../models/Accomodation');
const Facility = require('../models/Facility');
const { getById } = require('./serviceAccomodation');


async function getAllFacilities() {
    return await Facility.find({}).lean();
}

async function createFacility(label , iconUrl) {
    return Facility.create({
        label,
        iconUrl
    });
}

async function addFacilityToRoom(roomId , facilityIds) {
    const room = await Accomodation.findById(roomId);
    const facilities = await Facility.find({ _id: { $in: facilityIds } });

    room.facilities = facilities;
    await room.save();
}

module.exports = {
    getAllFacilities,
    createFacility,
    addFacilityToRoom
}