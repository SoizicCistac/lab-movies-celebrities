// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')

// all your routes here

router.get('/', async(req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render('celebrities/celebrities', {celebrities: allCelebrities})
    } catch (err) {
        next(err)
    }
})

router.get('/create', async(req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', async(req, res, next) => {
    const celebrity = req.body
    try {
        const createdCeleb = await Celebrity.create(celebrity)
        console.log(createdCeleb)
        res.redirect('/celebrities')
    } catch (err){
        res.redirect('/celebrities/new-celebrity')
        console.log(err)
        next(err)
    }
})


module.exports = router;