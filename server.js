"use strict";

// Module dependencies
var applicationRoot = __dirname;
var express = require("express");           // Web framework - HTTP server (JS equivalent to Apache)
var bodyParser = require("body-parser");    // Parser for reading request body
var path = require("path");                 // Utilities for dealing with file paths
var mongoose = require("mongoose");         // MongoDB integration

// Create server
var app = express();

// Configure server
app.configure( function() {
    // Where to serve static content
    app.use(express.static(path.join(applicationRoot, "dist")));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // Show all errors in development
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    // Perform route lookup based on URL and HTTP method
    app.use(app.router);
});

// Start server
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 4711;

app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});

// Routes
app.get("/api", function(request, response) {
    response.send("WWC2015 Sticker Swap Inventory API is running");
});

// Connect to database
// if (app.settings.env === "development") {
//     mongoose.connect("mongodb://localhost/library_database");
// } else {
mongoose.connect("mongodb://kopijunkie:2015panini@@ds055515.mongolab.com:55515/heroku_flr2shg6");
// }

// Schemas
var NeedStickerSchema = new mongoose.Schema({
    // stickerId: { type: Number, min: 1, max: 478 },
    stickerId: Number,
    found: Boolean,
    swapped: Boolean,
    swappedWith: String
});

var SpareStickerSchema = new mongoose.Schema({
    // stickerId: { type: Number, min: 1, max: 478 },
    stickerId: Number,
    reserved: Boolean,
    swapped: Boolean,
    swappedWith: String
});

//Models
var NeedSticker = mongoose.model("NeedSticker", NeedStickerSchema);
var SpareSticker = mongoose.model("SpareSticker", SpareStickerSchema);

//Get a list of all stickers I need
app.get("/api/needs", function(request, response) {
    return NeedSticker.find(function(error, needs) {
        if (!error) {
            return response.send(needs);
        } else {
            console.log(error);
        }
    });
});

//Get a single need sticker
app.get("/api/needs/:id", function(request, response) {
    return NeedSticker.findOne({ stickerId: request.params.id }, function(error, need) {
        if (!error) {
            return response.send(need);
        } else {
            console.log(error);
        }
    });
});

// Insert a new need sticker
app.post("/api/needs", function(request, response) {
    var need = new NeedSticker({
        stickerId: request.body.stickerId,
        found: request.body.found || false,
        swapped: request.body.swapped || false,
        swappedWith: request.body.swappedWith || ""
    });

    return need.save(function(error) {
        if (!error) {
            console.log("sticker added");
            return response.send(need);
        } else {
            console.log(error);
        }
    });
});

// Update a need sticker
app.put("/api/needs/:id", function(request, response) {
    console.log("Updating sticker " + request.body.id);
    return NeedSticker.findOne({ stickerId: request.params.id }, function(error, need) {
        need.stickerId = request.body.id;
        need.found = request.body.found;
        need.swapped = request.body.swapped;
        need.swappedWith = request.body.swappedWith;

        return need.save( function(error) {
            if (!error) {
                console.log("sticker updated");
                return response.send(need);
            } else {
                console.log(error);
            }
        });
    });
});

// Delete a need sticker
app.delete("/api/needs/:id", function(request, response) {
    console.log("Deleting sticker with ID: " + request.params.id);
    return NeedSticker.findOne({ stickerId: request.params.id }, function(err, need) {
        return need.remove(function(error) {
            if (!error) {
                console.log("sticker removed");
                return response.send("");
            } else {
                console.log(error);
            }
        });
    });
});

//Get a list of all my spare stickers
app.get("/api/spares", function(request, response) {
    return SpareSticker.find(function(error, spares) {
        if (!error) {
            return response.send(spares);
        } else {
            console.log(error);
        }
    });
});

//Get a single spare sticker
app.get("/api/spares/:id", function(request, response) {
    return SpareSticker.findOne({ stickerId: request.params.id }, function(error, spare) {
        if (!error) {
            return response.send(spare);
        } else {
            console.log(error);
        }
    });
});

//Insert a new spare sticker
app.post("/api/spares", function(request, response) {
    var spare = new SpareSticker({
        stickerId: request.body.stickerId,
        reserved: request.body.reserved || false,
        swapped: request.body.swapped || false,
        swappedWith: request.body.swappedWith || ""
    });

    return spare.save(function(error) {
        if (!error) {
            console.log("sticker added");
            return response.send(spare);
        } else {
            console.log(error);
        }
    });
});

// Update a spare sticker
app.put("/api/spares/:id", function(request, response) {
    console.log(request);
    console.log("Updating sticker " + request.body.id);
    return SpareSticker.findOne({ stickerId: request.params.id }, function(error, spare) {
        spare.stickerId = request.body.stickerId;
        spare.reserved = request.body.reserved;
        spare.swapped = request.body.swapped;
        spare.swappedWith = request.body.swappedWith;

        return spare.save( function(error) {
            if(!error) {
                console.log("sticker updated");
                return response.send(spare);
            } else {
                console.log(error);
            }
        });
    });
});

// Delete a spare sticker
app.delete("/api/spares/:id", function(request, response) {
    console.log("Deleting sticker with ID: " + request.params.id);
    return SpareSticker.findById(request.params.id, function(err, spare) {
        return spare.remove(function(error) {
            if (!error) {
                console.log("sticker removed");
                return response.send("");
            } else {
                console.log(error);
            }
        });
    });
});
