// import require modules
const morgan = require('morgan')
const express = require('express')
require('dotenv').config();
const path = require("path")



//  middelware 
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use("/static", express.static(path.join(__dirname, "static")));



// app routes
app.get("/*",async(req,res,next)=>{
    res.sendFile(path.join(__dirname, "static/ng-templates/layout.html"))
})











// export app 
module.exports = app
