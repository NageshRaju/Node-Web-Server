const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next)=>{
var now = new Date().toString();
var log =`${now}: ${req.method} ${req.url}`;
    // console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (error)=>{
       if(error){
           console.log(error);
       }
        
    })
    next();
   

})
// app.use((req,res,next)=>{
//     res.render('maintanance.hbs');
// })
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})
app.get('/', (req, res)=>{
    // /res.send('Hello Express');
    res.render('welcome.hbs', {
        pageTitle: 'Welcome to my Home'
    })
    });


app.get('/bad', (req,res)=>{
    res.send({
        error: "Unable to Process the Request"
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
})
app.listen(3000, ()=>{
    console.log("server is started on port 3000")
});