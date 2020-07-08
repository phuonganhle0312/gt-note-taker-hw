//require express
const express = require("express");
//create an instance of express
const app =  express ();
//add a port 
const PORT= process.env.PORT || 3000;

// sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View / HTML
app.get("/", (req, res) =>{
    res.send("Hello world;")
})

// API / JSON


//listen on port
app.listen(PORT, (req, res) => {
    console.log(`Currently running on http://localhost:${PORT}`);
});