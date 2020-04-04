const path = require("path");
const hbs = require("hbs");
const express = require("express");
const app = express();

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const publicPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use( express.static( publicPath ));
app.set("views",viewsPath);
app.set("view engine","hbs");
hbs.registerPartials( partialsPath );

app.get("",(req, res) => {
    res.render("index", {
        title: "Weather App",
        author: "Yan Moe Naing"
    });
})

app.get("/about",(req, res) => {
    res.render("about",{
        title: "About Us Page",
        content: "ကျွန်တော်တို website ကိုအသုံးပြု၍ မှန်ကန်သော ရာသီဥတုအခြေအနေများကို အမြဲမပြက်စောင့်ကြည့်နိုင်ပါတယ်။",
        author: "ရန်မိုးနိုင်"
    })
})

app.get("/help",(req, res) => {
    console.log( req.query );
    res.render("help",{
        title: "Help Page",
        content: "ဒုက္ခရောက်နေဘာသလား ကူညီဖို့အသင့်ပါ။",
        author: "ရန်မိုးနိုင်"
    })
})

app.get("/weather",(req, res) => {
    if( !req.query.address ) {
         return res.send({
            error: "Provide a search key value"
        })
    } 
    geocode(req.query.address,(error, { latitude = 0, longitude = 0, location = ""} = {} ) => {
        if( error ) {
            return res.send({
                error: error
            });
        } 
        forecast(longitude,latitude,(e,r) => {
            if( e ) {
                return res.send({
                    e
                })
            }  
            res.send({
                r,
                location
            })
        })
        
    } )
    
})

app.get("/help/*", (req, res) => {
    res.render("404",{
        errorMsg: "လူကြီးမင်းရှာဖွေနေသော Help page ကိုမတွေ့ရှိ၍ ဝမ်းနည်းပါတယ်"
    })
})

app.get("/*",(req, res) => {
    res.render("404", {
        errorMsg: "Page Not Found 404"
    })
})

app.listen(3000, () => {
    console.log("Server is up and running");
})

