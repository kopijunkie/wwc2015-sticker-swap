/*global StickerSwapInventory, $*/

window.StickerSwapInventory = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        "use strict";

        var needs = [{
            id: 777,
            found: false,
            swapped: false
        },{
            id: 888,
            found: false,
            swapped: false
        },{
            id: 999,
            found: false,
            swapped: false
        }];
        var stickersNeeded = new this.Collections.NeedsCollection(needs);
        console.log(stickersNeeded.toJSON());
        var needsList = new this.Views.NeedsListView({
            collection: stickersNeeded
        });
        $("#needs-region").append(needsList.el);

        var spares = [{
            id: 123,
            reserved: false,
            swapped: false
        },{
            id: 456,
            reserved: false,
            swapped: false
        },{
            id: 789,
            reserved: false,
            swapped: false
        }];
        var stickersSpare = new this.Collections.SparesCollection(spares);
        console.log(stickersSpare.toJSON());
        var sparesList = new this.Views.SparesListView({
            collection: stickersSpare
        });
        $("#spares-region").append(sparesList.el);
    }
};

$(document).ready(function () {
    "use strict";
    StickerSwapInventory.init();
});
