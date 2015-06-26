"use strict";

// Module dependencies
var applicationRoot = __dirname,
    express = require("express"),           // Web framework - HTTP server (JS equivalent to Apache)
    bodyParser = require("body-parser"),    // Parser for reading request body
    path = require("path"),                 // Utilities for dealing with file paths
    mongoose = require("mongoose");         // MongoDB integration

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
var port = 4711;

app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});

// Routes
app.get("/api", function(request, response) {
    response.send("WWC2015 Sticker Swap Inventory API is running");
});

// Connect to database
mongoose.connect("mongodb://localhost/library_database");

// Schemas
var NeedSticker = new mongoose.Schema({
    // stickerId: { type: Number, min: 1, max: 478 },
    stickerId: Number,
    found: Boolean,
    swapped: Boolean,
    swappedWith: String
});

var SpareSticker = new mongoose.Schema({
    // stickerId: { type: Number, min: 1, max: 478 },
    stickerId: Number,
    reserved: Boolean,
    swapped: Boolean,
    swappedWith: String
});

//Models
var NeedStickerModel = mongoose.model("NeedSticker", NeedSticker);
var SpareStickerModel = mongoose.model("SpareSticker", SpareSticker);

//Get a list of all stickers I need
app.get("/api/needs", function(request, response) {
    return NeedStickerModel.find(function(error, needs) {
        if (!error) {
            return response.send(needs);
        } else {
            return console.log(error);
        }
    });
});

//Get a single need sticker
app.get("/api/needs/:id", function(request, response) {
    return NeedStickerModel.findOne({ stickerId: request.params.id }, function(error, need) {
        if (!error) {
            return response.send(need);
        } else {
            return console.log(error);
        }
    });
});

// Insert a new need sticker
app.post("/api/needs", function(request, response) {
    console.log("Adding sticker: ", request);
    var need = new NeedStickerModel({
        stickerId: request.body.id,
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
    return NeedStickerModel.findOne({ stickerId: request.params.id }, function(error, need) {
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
    return NeedStickerModel.findOne({ stickerId: request.params.id }, function(err, need) {
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
    return SpareStickerModel.find(function(error, spares) {
        if (!error) {
            return response.send(spares);
        } else {
            return console.log(error);
        }
    });
});

//Get a single spare sticker
app.get("/api/spares/:id", function(request, response) {
    return SpareStickerModel.findOne({ stickerId: request.params.id }, function(error, spare) {
        if (!error) {
            return response.send(spare);
        } else {
            return console.log(error);
        }
    });
});

//Insert a new spare sticker
app.post("/api/spares", function(request, response) {
    var spare = new SpareStickerModel({
        stickerId: request.body.id,
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
    console.log("Updating sticker " + request.body.id);
    return SpareStickerModel.findOne({ stickerId: request.params.id }, function(error, spare) {
        spare.stickerId = request.body.id;
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
    return SpareStickerModel.findOne({ stickerId: request.params.id }, function(err, spare) {
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
