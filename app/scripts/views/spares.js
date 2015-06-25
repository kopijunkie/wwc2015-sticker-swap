/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.SparesListView = Backbone.View.extend({
        template: JST["app/scripts/templates/spares.ejs"],
        className: "spare-stickers",

        events: {},

        initialize: function () {
            this.collection = new StickerSwapInventory.Collections.SparesCollection();
            this.collection.fetch();

            this.render();

            this.listenTo(this.collection, "add", this.renderSpare);
            this.listenTo(this.collection, "reset", this.render);
        },

        render: function () {
            this.$el.append(this.template());
            this.collection.each(function(sticker) {
                this.renderSpare(sticker);
            }, this);
        },

        renderSpare: function(sticker) {
            var stickerSpareView = new StickerSwapInventory.Views.SpareStickerView({
                model: sticker
            });
            this.$el.find("#spares-list").append(stickerSpareView.render().el);
        }

    });

})();
