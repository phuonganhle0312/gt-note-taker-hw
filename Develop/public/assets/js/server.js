//require express
const express = require("express");
//create an instance of express
const app =  express ();
//add a port 
const PORT= process.env.PORT || 3000;
//listen on port
app.listen(PORT, (req, res) => {
    console.log(`Currently running on http://localhost:${PORT}`);
})