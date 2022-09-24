const fs = require("fs");

const fileName = './models/dataAccomodation.json';

const data = JSON.parse(fs.readFileSync(fileName));

async function persist() {
    return new Promise((res, rej) => {
        fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
            if (err == null) {
                res();
            } else {
                rej(err);
            }
        });
    });
};

function getAll(search , city , fromPrice , toPrice) {
    search = search.toLowerCase();

    return data
        .filter(r => r.name.toLowerCase().includes(search) || r.description.toLowerCase().includes(search))
        .filter(r => r.city.toLowerCase().includes(city.toLowerCase()))
        .filter(r => r.price >= fromPrice && r.price <= toPrice);
};

function getById(id) {
    return data.find(el => el.id == id);
}

async function create(roomData) {
    const room = {
        id: getId(),
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        price: Number(roomData.price),
        beds: Number(roomData.beds),
        imageUrl: roomData.imageUrl
    }

    let missingFields = Object.entries(room).filter(([k , v]) => !v);

    if(missingFields.length > 0) {
        throw new Error(missingFields.map(m => `${m[0]} is required!`).join('\n'));
    }

    data.push(room);
    await persist();

    return room;
}

function getId() {
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-6);
}

module.exports = {
    getAll,
    getById,
    create
};