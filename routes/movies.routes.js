// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

// all your routes here
router.get('/', async(req, res, next) => {
    try {
        const allMovies = await Movie.find()
        res.render('movies/movies', {movies: allMovies})
    } catch (err) {
        next(err)
    }
})

router.get('/create', async(req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render('movies/new-movie', {celebrities: allCelebrities})
    } catch (err) {
        next(err)
    }
})

router.post('/create', async(req, res, next) => {
    const movie = req.body
    try {
        const createdMovie = await Movie.create(movie)
        console.log(createdMovie)
        res.redirect('/movies')
    } catch (err){
        res.redirect('/movies/new-movie')
        console.log(err)
        next(err)
    }
})

router.get('/:id', async(req, res, next) => {
    try{
        const movie = await Movie.findById(req.params.id).populate('cast')
        res.render('./movies/movie-details', {movie})
    } catch(err) {
        next(err)
    }
})

router.post('/:id/delete', async(req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id)
        res.redirect('/movies')
    } catch (error) {
        next(error)
    }
})


module.exports = router;