/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Models = StickerSwapInventory.Models || {};

(function () {
    "use strict";

    StickerSwapInventory.Models.NeedStickerModel = Backbone.Model.extend({

        url: "",

        initialize: function() {
        },

        defaults: {
            "found": false,
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
