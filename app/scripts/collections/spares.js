/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Collections = StickerSwapInventory.Collections || {};

(function () {
    "use strict";

    StickerSwapInventory.Collections.SparesCollection = Backbone.Collection.extend({

        model: StickerSwapInventory.Models.SpareStickerModel

    });

})();
