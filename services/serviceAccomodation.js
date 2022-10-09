const Accomodation = require('../models/Accomodation');

function getAll(search , city , fromPrice , toPrice) {
     return Accomodation.find({}).lean();
};

function getById(id) {
    return Accomodation.findById(id).lean();
}

async function create(roomData , ownerId) {
    const room = {
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        price: Number(roomData.price),
        beds: Number(roomData.beds),
        imgUrl: roomData.imgUrl,
        owner: ownerId
    }

    let missingFields = Object.entries(room).filter(([k , v]) => !v);

    if(missingFields.length > 0) {
        throw new Error(missingFields.map(m => `${m[0]} is required!`).join('\n'));
    }

    const result = await Accomodation.create(room);

    return result;
}

async function updateRoom(roomId , roomData) {
    const missing = Object.entries(roomData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        throw new Error(missing.map(m => `${m[0]} is required!`).join('\n'));
    }

    const room = await Accomodation.findById(roomId);

    room.name = roomData.name;
    room.description = roomData.description;
    room.city = roomData.city;
    room.beds = Number(roomData.beds);
    room.price = Number(roomData.price);
    room.imgUrl = roomData.imgUrl;

    await room.save();

    return room;
}

async function deleteById(roomId) {
    return Accomodation.findByIdAndRemove(roomId);
}

module.exports = {
    getAll,
    getById,
    create,
    updateRoom,
    deleteById
};