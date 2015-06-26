/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.SparesListView = Backbone.View.extend({
        template: JST["app/scripts/templates/spares.ejs"],
        className: "spare-stickers",

        events: {
            "click .clear": "clearText",
            "click .submit": "submitStickerIds"
        },

        initialize: function () {
            this.collection = new StickerSwapInventory.Collections.SparesCollection();
            this.collection.fetch();

            this.render();

            this.listenTo(this.collection, "add", this.renderSpare);
            this.listenTo(this.collection, "reset", this.render);
        },

        render: function () {
            this.collection.sort();
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
        },

        clearText: function() {
            this.$el.find(".stickers__input").val("");
        },

        submitStickerIds: function(event) {
            event.preventDefault();

            var stickerIdsString = this.$el.find(".stickers__input").val();
            var stickerIds = stickerIdsString.split(",");
            var errorsFound = 0;

            _.each(stickerIds, _.bind(function(stickerId) {
                stickerId = stickerId.trim();

                if (!$.isNumeric(stickerId)) {
                    errorsFound++;
                    alertify.error("Sticker ID '" + stickerId + "' is not a number");
                    return;
                }

                this.collection.create({
                    stickerId: stickerId
                }, {
                    wait: true,
                    success: _.bind(function() {
                        alertify.success("Sticker #" + stickerId + " added!");
                        this.clearText();
                    }, this),
                    error: function() {
                        alertify.error("Sticker #" + stickerId + " not added!");
                    }
                });
            }, this));

            if (errorsFound === 0) {
                this.clearText();
            }
        }

    });

})();
