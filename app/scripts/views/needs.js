/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.NeedsListView = Backbone.View.extend({

        template: JST["app/scripts/templates/needs.html"],

        tagName: "ul",

        id: "",

        className: "needs__list",

        events: {},

        initialize: function (initialNeeds) {
            this.collection = new StickerSwapInventory.Collections.NeedsCollection(initialNeeds) || new StickerSwapInventory.Collections.NeedsCollection();
            StickerSwapInventory.render();
        },

        render: function () {
            // this.$el.html(this.template(this.model.toJSON()));
            // return this;
            this.collection.each(function(sticker) {
                this.renderStickerNeeded(sticker);
            });
        },

        renderStickerNeeded: function(sticker) {
            console.log(sticker);
            var stickerNeededView = new StickerSwapInventory.Views.NeedView({
                model: sticker
            });
            this.$el.append(stickerNeededView.render().el);
        }

    });

})();
