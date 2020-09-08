// ==============================================================================
// LOAD MODULES
// ==============================================================================
const router = require("express").Router();
const fs = require("fs");

// ==============================================================================
// ROUTING
// ==============================================================================

// ==============================================================================
// API GET Request
// Below code handles refresh events when a user loads/reloads, saves, and deletes a note.
// This route simply reads data from db.json and returns it to be displayed.
// ==============================================================================
router.get("/notes", function(req, res) {

    // Use fs.readFile to access data in db.json
    fs.readFile("./db/db.json", "utf8", function(err, data) {
        
        // Throw error code of there was issue reading db.json
        if (err) throw err;

        // Pass parsed data from db.json as response to be rendered in index.js 
        res.json(JSON.parse(data));

    });

});

// ==============================================================================
// API POST Request
// Below code handles when a user saves a note and writes data to db.json.
// ==============================================================================
router.post("/notes", function(req, res) {

    // Use fs.readFile to access data in db.json
    fs.readFile("./db/db.json", "utf8", function(err, data) {

        // Throw error code of there was issue reading db.json
        if (err) throw err;

        // Parse and store db.json data to raw
        let raw = JSON.parse(data);

        // Push user's new note content to raw
        raw.push(req.body);

        // Use fs.writeFile to write raw array data to db.json  
        fs.writeFile("./db/db.json", JSON.stringify(raw), function(err) {

            // Throw error code of there was issue writing to db.json
            if(err) return err;

            // log "write success" to console/terminal
            console.log("write success");

        });

    });

    // End response process
    res.end();

});

// ==============================================================================
// API DELETE Request
// Below code handles when a user deletes a note and writes data to db.json.
// ==============================================================================
router.delete("/notes/:id", function(req, res) {

    // Store id of user-selected note for deletion 
    let id = req.params.id;

    // Use fs.readFile to access data in db.json
    fs.readFile("./db/db.json", "utf8", function(err, data) {

        // Throw error code of there was issue reading db.json
        if (err) throw err;

        // Parse and store db.json data to raw
        let raw = JSON.parse(data);

        // Loop through the entirity of raw
        for (let i = 0; i < raw.length; i++) {

            // See if the user selected id matches any of the id's in raw
            if (id == raw[i].id) {

                // If the id's match, splice the indexed note out of raw 
                raw.splice(i,1);

                // Use fs.writeFile to write raw array data to db.json  
                fs.writeFile("./db/db.json", JSON.stringify(raw), function(err) {

                    // Throw error code of there was issue reading db.json
                    if (err) throw err;

                    // log "note deleted" to console/terminal
                    console.log("note deleted");

                });

            };

        };

    });
    
    // End response process
    res.end(); 

});

module.exports = router;