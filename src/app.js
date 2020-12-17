const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const patialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(patialsPath)

// Setup static diretory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'The title of the page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'The title of the page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'contact use if you need help.',
        title: 'Help',
        name: 'Blinkz Nero'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    console.log(req.query.address)

    res.send({
        forcast: 'it\s a 100% cold',
        location: 'philadophia',
        address: req.query.address
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }

    console.log(req.query.search);

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Sunday Patrick',
        errormsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Sunday Patrick',
        errormsg: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running port 3000')
})