const { getAll , getById } = require('../services/serviceAccomodation');

const router = require('express').Router();

router.get('/' , (req, res) => {
    const search = req.query.search || "";
    const city = req.query.city || "";
    const fromPrice = Number(req.query.fromPrice) || 1;
    const toPrice = Number(req.query.toPrice) || 1000;

    const rooms = getAll(search , city , fromPrice , toPrice);

    res.render('catalog' , {
        title: "Accomodation Catalog",
        rooms,
        search,
        city,
        fromPrice,
        toPrice
    })
});

router.get('/:id' , (req , res) => {
    const id = req.params.id;
    const room = getById(id);

    if(room) {
      res.render('details' , {
        title: "Accomodation details",
        room
      })
    } else {
      res.render('roomNotFound' , {
        title: "Accomodation details",
        id
      })
    }
});

module.exports = router;