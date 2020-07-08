// require express
const express = require("express");
// require path
const path = require("path");
// require fs
const fs = require("fs");

// create an instance of express
const app = express();
// add a port
const PORT = process.env.PORT || 3000;

// sets up the express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));


// GET requests
// View / HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// API/JSON
// retrieve note data
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/db/db.json"));
});
let notesData = [];
app.get("/api/notes", function (req, res) {
    notesData = fs.readFileSync("/db/db.json", "utf-8");
    notesData = JSON.parse(notesData);
    res.JSON(notesData);
});
// post note data
app.post("/api/notes", function (req, res) { 
    // read and parse data from json
    notesData = fs.readFileSync("/db/db.json", "utf-8");
    notesData = JSON.parse(notesData);
    let note = req.body;
    note.id = notesData.length + 1;
    notesData.push(note);
    notesData = JSON.stringify(notesData);
//write to db
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notesData), "utf-8", (err) => {
        if (err) 
            throw err;
        

        console.log("Your note has been posted.");
    });
    res.json(JSON.parse(notesData));

    // delete note
    app.delete("/api/notes/:id", function(req, res) {
        notesData= fs.readFileSync("/db/db.json", "utf-8");
        notesData = JSON.parse(notesData);
        const toDelete = notesData.filter((note) => note.id != parseInt(req.params.id));
            fs.writeFile("/db/db.json", JSON.stringify(toDelete), "utf-8", (err) => {
                if (err) 
                    throw err;
    
                    console.log("Your note has been deleted.");
            });
            res.json(toDelete);
          });
        
        

   
    })


// listen on port
app.listen(PORT, (req, res) => {
    console.log(`Currently running on http://localhost:${PORT}`);
});
