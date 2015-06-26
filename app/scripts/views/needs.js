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
                    var sticker = new StickerSwapInventory.Models.NeedStickerModel({
                        id: stickerId
                    });
                    this.collection.create(sticker, {
                        wait: true,
                        success: function() {
                            alertify.success("Sticker added!");
                        },
                        error: function() {
                            alertify.error("Sticker not added!");
                        }
                    });
                }
            }, this));
            console.log(this.collection.toJSON());
        }

    });

})();
