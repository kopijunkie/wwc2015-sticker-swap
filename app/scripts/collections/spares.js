/*global StickerSwapInventory, Backbone*/

StickerSwapInventory.Collections = StickerSwapInventory.Collections || {};

(function () {
    "use strict";

    StickerSwapInventory.Collections.SparesCollection = Backbone.Collection.extend({

        url: "/api/spares",
        model: StickerSwapInventory.Models.SpareStickerModel,
        comparator: function(model) {
            return model.get("id");
        }

    });

})();
