/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Models = StickerSwapInventory.Models || {};

(function () {
    "use strict";

    StickerSwapInventory.Models.SpareStickerModel = Backbone.Model.extend({

        url: "",

        initialize: function() {
        },

        defaults: {
            "reserved": false,
            "swapped": false,
            "swappedWith": ""
        },

        validate: function(attrs, options) {
            console.log(attrs, options);
        },

        parse: function(response, options)  {
            console.log(response, options);
            return response;
        }
    });

})();
