/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Models = StickerSwapInventory.Models || {};

(function () {
    "use strict";

    StickerSwapInventory.Models.SpareStickerModel = Backbone.Model.extend({

        defaults: {
            reserved: false,
            swapped: false,
            swappedWith: ""
        },

        validate: function(attrs) {
            console.log(attrs);
        },

        parse: function(response)  {
            return {
                id: response.stickerId,
                reserved: response.reserved,
                swapped: response.swapped,
                swappedWith: response.swappedWith
            };
        }
    });

})();
