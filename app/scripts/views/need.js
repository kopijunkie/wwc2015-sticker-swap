/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.NeedView = Backbone.View.extend({
        template: JST["app/scripts/templates/need.ejs"],
        tagName: "li",
        className: "stickers__list-item needs__list-item",

        events: {
            "click .found-swap.checkbox": "onFoundCheckboxClick",
            "click .found-swap.checkbox__label": "onFoundCheckboxLabelClick",
            "click .swapped.checkbox": "onSwappedCheckboxClick",
            "click .swapped.checkbox__label": "onSwappedCheckboxLabelClick"
        },

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        onFoundCheckboxClick: function() {
            var stickerId = this.model.id;
            var found = this.$el.find(".found-swap.checkbox").prop("checked");

            this.model.save("found", found, {
                success: function() {
                    alertify.success("Sticker #" + stickerId + " updated");
                },
                error: function() {
                    alertify.error("Could not update Sticker #" + stickerId);
                }
            });
        },

        onFoundCheckboxLabelClick: function(event) {
            event.preventDefault();

            if (this.$el.find(".found-swap.checkbox").prop("checked")) {
                this.model.save("found", false, {
                    success: _.bind(function() {
                        alertify.success("Sticker #" + this.model.id + " updated");
                        this.$el.find(".found-swap.checkbox").prop("checked", false);
                    }, this),
                    error: _.bind(function() {
                        alertify.error("Could not update Sticker #" + this.model.id);
                    }, this)
                });
            } else {
                this.model.save("found", true, {
                    success: _.bind(function() {
                        alertify.success("Sticker #" + this.model.id + " updated");
                        this.$el.find(".found-swap.checkbox").prop("checked", true);
                    }, this),
                    error: _.bind(function() {
                        alertify.error("Could not update Sticker #" + this.model.id);
                    }, this)
                });
            }
        },

        onSwappedCheckboxClick: function() {
            var stickerId = this.model.id;
            var swapped = this.$el.find(".swapped.checkbox").prop("checked");

            this.model.save("swapped", swapped, {
                success: function() {
                    alertify.success("Sticker #" + stickerId + " updated");
                },
                error: function() {
                    alertify.error("Could not update Sticker #" + stickerId);
                }
            });
        },

        onSwappedCheckboxLabelClick: function(event) {
            event.preventDefault();

            if (this.$el.find(".swapped.checkbox").prop("checked")) {
                this.model.save("swapped", false, {
                    success: _.bind(function() {
                        alertify.success("Sticker #" + this.model.id + " updated");
                        this.$el.find(".swapped.checkbox").prop("checked", false);
                    }, this),
                    error: _.bind(function() {
                        alertify.error("Could not update Sticker #" + this.model.id);
                    }, this)
                });
            } else {
                this.model.save("swapped", true, {
                    success: _.bind(function() {
                        alertify.success("Sticker #" + this.model.id + " updated");
                        this.$el.find(".swapped.checkbox").prop("checked", true);
                    }, this),
                    error: _.bind(function() {
                        alertify.error("Could not update Sticker #" + this.model.id);
                    }, this)
                });
            }
        },

        close: function() {
            this.stopListening();
        }

    });

})();
