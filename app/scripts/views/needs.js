/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.NeedsListView = Backbone.View.extend({
        template: JST["app/scripts/templates/needs.ejs"],
        className: "stickers-needed",

        events: {
            "click .clear": "clearText",
            "click .submit": "submitStickerIds"
        },

        initialize: function () {
            this.collection = new StickerSwapInventory.Collections.NeedsCollection();
            this.collection.fetch();
            this.collection.sort();

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
        },

        clearText: function() {
            this.$el.find(".stickers__input").val("");
        },

        submitStickerIds: function(event) {
            event.preventDefault();

            var stickerIdsString = this.$el.find(".stickers__input").val();
            var stickerIds = stickerIdsString.split(",");

            _.each(stickerIds, _.bind(function(stickerId) {
                stickerId = stickerId.trim();

                if (stickerId.length > 0) {
                    this.collection.create({
                        stickerId: stickerId
                    }, {
                        wait: true,
                        success: function(model, response) {
                            alertify.success("Sticker #" + stickerId + " added!");
                        },
                        error: function(model, error) {
                            alertify.error("Sticker #" + stickerId + " not added!");
                        }
                    });
                }
            }, this));
        }

    });

})();
