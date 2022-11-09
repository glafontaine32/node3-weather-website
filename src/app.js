const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// define paths fro exprexx config
const publicDirectryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// setup handel bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup statis directory to serve
app.use(express.static(publicDirectryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gary L'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gary L'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'help page',
        title: 'Help',
        name: 'Gary L'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location!'
        })
    }

    console.log(req.query.location)

    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send(error)
            }

            res.send ({
                location,
                forecast: forecastData,
                address: req.query.location
            })
    
        })
    })
   
    })

    app.get('/products', (req, res) => {
        if (!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
            })
        }

        console.log(req.query.search)
        res.send({
            products: []
        })
    })


app.get('/help/*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Help article not found!',
        title: '404',
        name: 'Gary L'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Gary L'
    })
})




app.listen(3000, () => {
    console.log('Server is up on 3000.')
})