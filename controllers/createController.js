const { create } = require('../services/serviceAccomodation');

const router = require('express').Router();

router.get('/', (req , res) => {
    res.render("create", {
        title: "Create Accomodation",
    })
});

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        res.redirect('/catalog/' + result._id);
        
    } catch(err) {
        res.render('create', {
            title: 'Request Error',
            error: err.message.split('\n')
        });
    }
});

module.exports = router;