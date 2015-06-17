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
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
