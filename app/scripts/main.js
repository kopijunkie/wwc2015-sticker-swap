/*global StickerSwapInventory, $*/

window.StickerSwapInventory = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        "use strict";
        console.log("Hello from Backbone!", this);
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
        console.log(needsList);
        $("#needs-region").append(needsList.render().el);

        // var sparesList = new this.Views.SparesListView({
        //     collection: new this.Collections.SparesCollection()
        // });
        // $("#spares-region").append(sparesList.render().el);
    }
};

$(document).ready(function () {
    "use strict";
    StickerSwapInventory.init();
});
