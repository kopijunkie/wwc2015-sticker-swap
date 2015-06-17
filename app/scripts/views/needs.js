/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.NeedsListView = Backbone.View.extend({
        template: JST["app/scripts/templates/needs.ejs"],
        tagName: "ul",
        className: "needs__list",

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            // this.$el.html(this.template(this.model.toJSON()));
            // return this;
            this.collection.each(function(sticker) {
                this.renderStickerNeeded(sticker);
            }, this);
        },

        renderStickerNeeded: function(sticker) {
            var stickerNeededView = new StickerSwapInventory.Views.NeedView({
                model: sticker
            });
            console.log(stickerNeededView);
            this.$el.append(stickerNeededView.render().el);
        }

    });

})();
