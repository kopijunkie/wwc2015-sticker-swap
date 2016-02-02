/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Collections = StickerSwapInventory.Collections || {};

(function () {
    "use strict";

    StickerSwapInventory.Collections.NeedsCollection = Backbone.Collection.extend({

        url: "/api/needs",
        model: StickerSwapInventory.Models.NeedStickerModel,
        comparator: function(model) {
            return model.get("id"); // TODO: sort by Sticker ID
        }

    });

})();
