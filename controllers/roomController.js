const { getById, updateRoom, deleteById } = require('../services/serviceAccomodation');

const roomController = require('express').Router();

roomController.get('/:id/edit' , async (req , res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);
    if (!req.user || room.owner != req.user.id) {
        return res.redirect('/auth/login');
    };

    res.render('edit' , {
        title: 'Edit Accomodation',
        room
    });
});

roomController.post('/:id/edit' , async (req , res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);
    
    if (!req.user || room.owner != req.user.id) {
        return res.redirect('/auth/login');
    }

    try {
        const result = await updateRoom(roomId, req.body);
        res.redirect('/catalog/' + result._id);
    } catch (err) {
        req.body._id = roomId;
        res.render('edit', {
            title: 'Edit Accomodation',
            error: err.message.split('\n'),
            room: req.body
        });
    }
});

roomController.get('/:id/delete' , async (req , res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);
    if (!req.user || room.owner != req.user.id) {
        return res.redirect('/auth/login');
    };

    res.render('delete' , {
        title: 'Delete Accomodation',
        room
    });
});

roomController.post('/:id/delete' , async (req , res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if (!req.user || room.owner != req.user.id) {
        return res.redirect('/auth/login');
    }

    try {
        await deleteById(roomId);
        res.redirect('/catalog/');
    } catch (err) {
        req.body._id = roomId;
        res.render('delete', {
            title: 'Delete Accomodation',
            error: err.message.split('\n'),
            room: req.body
        });
    }
})

module.exports = roomController;