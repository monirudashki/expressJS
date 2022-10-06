const Accomodation = require('../models/Accomodation');

function getAll(search , city , fromPrice , toPrice) {
     return Accomodation.find({}).lean();
};

function getById(id) {
    return Accomodation.findById(id).lean();
}

async function create(roomData) {
    const room = {
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        price: Number(roomData.price),
        beds: Number(roomData.beds),
        imgUrl: roomData.imgUrl
    }

    let missingFields = Object.entries(room).filter(([k , v]) => !v);

    if(missingFields.length > 0) {
        throw new Error(missingFields.map(m => `${m[0]} is required!`).join('\n'));
    }

    const result = await Accomodation.create(room);

    return result;
}

module.exports = {
    getAll,
    getById,
    create
};