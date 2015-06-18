/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Models = StickerSwapInventory.Models || {};

(function () {
    "use strict";

    StickerSwapInventory.Models.NeedStickerModel = Backbone.Model.extend({

        defaults: {
            found: false,
            swapped: false,
            swappedWith: ""
        },

        validate: function(attrs) {
            console.log(attrs);
        },

        parse: function(response)  {
            return {
                id: response.stickerId,
                found: response.found,
                swapped: response.swapped,
                swappedWith: response.swappedWith
            };
        }
    });

})();
