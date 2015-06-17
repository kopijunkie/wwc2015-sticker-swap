/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Collections = StickerSwapInventory.Collections || {};

(function () {
    "use strict";

    StickerSwapInventory.Collections.NeedsCollection = Backbone.Collection.extend({

        model: StickerSwapInventory.Models.NeedStickerModel

    });

})();
