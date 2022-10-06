const facilityController = require('express').Router();
const { getById } = require('../services/serviceAccomodation');
const {createFacility, getAllFacilities, addFacilityToRoom} = require('../services/serviceFasilities')

facilityController.get('/create' , (req , res) => {
    res.render('createFacility', {
        title: 'Create new Facility'
    });
});

facilityController.post('/create' , async (req , res) => {
     try {
        await createFacility(req.body.label , req.body.iconUrl);
        res.redirect('/catalog');
     }catch(err) {
        res.render('createFacility', {
            title: 'Create new Facility'
        });
     }
});

facilityController.get('/:roomId/decorateRoom' , async (req , res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);
    const facilities = await getAllFacilities();
    
    facilities.forEach(f => {
        if ((room.facilities || []).some(id => id.toString() == f._id.toString())) {
            f.checked = true;
        }
    });

    res.render('decorate' , {
        title: "Decorate Room",
        room,
        facilities
    })
});

facilityController.post('/:roomId/decorateRoom' , async (req , res) => {
    const roomId = req.params.roomId;
    const facilities = Object.keys(req.body);
    
    await addFacilityToRoom(roomId , facilities);

    res.redirect('/facility/' + req.params.roomId + '/decorateRoom');
});

module.exports = facilityController;