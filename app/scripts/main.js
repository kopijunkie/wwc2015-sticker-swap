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
        var needsList = new this.Views.NeedsListView(needs);
        console.log(needsList);

        var needThis = new this.Models.NeedStickerModel({
            id: 777,
            "found": false,
            "swapped": false
        });
        console.log(needThis.toJSON());
        var needSticker = new this.Views.NeedView({
            model: needThis
        });
        $("#needs-region").append(needSticker.render().el);

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
