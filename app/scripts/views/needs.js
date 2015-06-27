/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.NeedsListView = Backbone.View.extend({
        template: JST["app/scripts/templates/needs.ejs"],
        className: "stickers-needed",

        events: {
            "click .add": "showStickerIdsInput",
            "click .hide-ui": "hideStickerIdsInput",
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
            this.collection.sort();
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

        showStickerIdsInput: function() {
            this.$el.find(".add-stickers-needed").slideDown();
            this.$el.find(".add").hide();
            this.$el.find(".hide-ui").show();
        },

        hideStickerIdsInput: function() {
            this.$el.find(".add-stickers-needed").slideUp();
            this.$el.find(".add").show();
            this.$el.find(".hide-ui").hide();
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
                    }, this),
                    error: function() {
                        alertify.error("Sticker #" + stickerId + " not added!");
                    }
                });
            }, this));

            if (errorsFound === 0) {
                this.clearText();
            }
        },

        close: function() {
            this.stopListening();
        }

    });

})();
