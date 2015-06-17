/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.SparesListView = Backbone.View.extend({
        template: JST["app/scripts/templates/spares.ejs"],
        tagName: "section",
        className: "spare-stickers",

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.append(this.template());
            this.collection.each(function(sticker) {
                this.renderStickersSpare(sticker);
            }, this);
        },

        renderStickersSpare: function(sticker) {
            var stickerSpareView = new StickerSwapInventory.Views.SpareStickerView({
                model: sticker
            });
            this.$el.find("#spares-list").append(stickerSpareView.render().el);
        }

    });

})();
