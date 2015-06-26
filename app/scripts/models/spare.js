/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Models = StickerSwapInventory.Models || {};

(function () {
    "use strict";

    StickerSwapInventory.Models.SpareStickerModel = Backbone.Model.extend({

        idAttribute: "_id",

        defaults: {
            _id: null,
            reserved: false,
            swapped: false,
            swappedWith: ""
        },

        validate: function(attrs) {
            if (attrs.swapped && !attrs.found) {
                alertify.error("Sticker not marked as 'found' yet.");
            }
        },

        parse: function(response)  {
            return {
                stickerId: response.stickerId,
                reserved: response.reserved,
                swapped: response.swapped,
                swappedWith: response.swappedWith
            };
        }
    });

})();
