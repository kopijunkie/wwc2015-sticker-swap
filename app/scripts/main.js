/*global StickerSwapInventory, $*/

window.StickerSwapInventory = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        "use strict";

        var needsList = new this.Views.NeedsListView();
        $("#needs-region").append(needsList.el);

        var sparesList = new this.Views.SparesListView();
        $("#spares-region").append(sparesList.el);
    }
};

$(document).ready(function () {
    "use strict";
    StickerSwapInventory.init();
});
