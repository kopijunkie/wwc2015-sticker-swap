/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.NeedsListView = Backbone.View.extend({
        template: JST["app/scripts/templates/needs.ejs"],
        tagName: "section",
        className: "stickers-needed",

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.append(this.template());
            this.collection.each(function(sticker) {
                this.renderStickerNeeded(sticker);
            }, this);
        },

        renderStickerNeeded: function(sticker) {
            var stickerNeededView = new StickerSwapInventory.Views.NeedView({
                model: sticker
            });
            this.$el.find("#needs-list").append(stickerNeededView.render().el);
        }

    });

})();
