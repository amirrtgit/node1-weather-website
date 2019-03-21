 
const path = require('path')
const express = require('express');
const hbs = require('hbs')

const foreCast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express();
//for deploying outside
const port = process.env.PORT || 3000

// Define paths for Express config
const pubDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pubDir));
 
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andre'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About the Weather App creater',
        name: 'Andre'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'The page displays the help text for the Weather Application and how to use the weather app!',
        title: 'Help for the Weather App',
        name: 'Andre'
    })
})



//  app.get('', (req, res) => {
//     res.send('<h1>Weather App</h1>');
//  })

//  app.get('/help',(req,res) => {
//     // res.send({
//     //     name: 'Andre',
//     //     age:28
//     // })

//     // res.send([{
//     //     name: 'Andre'
//     // }, {
//     //     name: 'Sarah'
//     // }])


//  })
// app.use('/about', express.static(pubDirAbt));

//  app.get('/about', (req,res) => {
//     // res.send('<h1>About </h1> <h2>the site</h2>');
//     //req.path(path.join(pubDir,'about.html'));
//     res

// })

 app.get('/weather', (req, res) => {
     if (!req.query.address){
         return res.send({
             error: "Please provide an address"
         })
     }

     geoCode(req.query.address, (error, {Latitude,Longtitude,Location} = {}) => {

        if (error){
         
            return res.send({error});
            
        }  
      
    
        foreCast(Latitude, Longtitude, (error, forecastdata) => {
            if (error){
                return res.send({error});
            }
            
             res.send({
                 Location:  Location,
                 Forecast:  forecastdata
                })
            
            
          })
    })

    //  res.send({
    //         latitude: 120,
    //         logitude: -75,
    //         //location: 'Boston'
    //         location: req.query.address
    //     })

  
 })
 
app.get('/help/*',(req, res) => {
    //res.send('The help file articles are not found!')
    res.render('404', {
        title: '404',
        name: 'Andre',
        frmPage: 'Help articles not found'
    })
})

app.get('/product', (req,res) => {
    if (!req.query.search){
        return res.send({
             error: 'Please provide a search item for products!'
        })
        
    }
        res.send({
        product:[]
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page');
    res.render('404',{
        title: '404',
        name: 'Andre',
        frmPage: 'This page is not found'
    })
})

// local run
// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


