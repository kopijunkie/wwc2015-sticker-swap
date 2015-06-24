/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.NeedsListView = Backbone.View.extend({
        template: JST["app/scripts/templates/needs.ejs"],
        className: "stickers-needed",

        events: {

        },

        initialize: function () {
            this.collection = new StickerSwapInventory.Collections.NeedsCollection();
            this.collection.fetch();

            this.render();

            this.listenTo(this.collection, "add", this.renderNeed);
            this.listenTo(this.collection, "reset", this.render);
        },

        render: function () {
            this.$el.append(this.template());
            this.collection.each(function(sticker) {
                this.renderNeed(sticker);
            }, this);
        },

        renderNeed: function(sticker) {
            var stickerNeededView = new StickerSwapInventory.Views.NeedView({
                model: sticker
            });
            this.$el.find("#needs-list").append(stickerNeededView.render().el);
        }

    });

})();
