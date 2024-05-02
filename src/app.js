const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Defining paths for express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup for handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Set static directory to serve
app.use(express.static(publicDirPath))


app.get('' , (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hemant'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hemant'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Hemant'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    
    // res.send({
    //     forecast : 'Weather clean',
    //     name: 'hemant',
    //     address: req.query.address
    // })
})
app.get('/product', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search'
        })

    }
    console.log(req.query.search)
    res.send({
        product : []
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hemant',
        errorMessage: 'Page not found.'
    })
})






app.listen(3000, () => {
    console.log('Server is up and running at port 3000')
})


