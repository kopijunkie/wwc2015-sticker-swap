/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.SpareStickerView = Backbone.View.extend({
        template: JST["app/scripts/templates/spare.ejs"],
        tagName: "li",
        className: "spares__list-item",

        events: {
            "click .reserved-swap.checkbox": "onReservedCheckboxClick",
            "click .reserved-swap.checkbox__label": "onReservedCheckboxLabelClick",
            "click .swapped.checkbox": "onSwappedCheckboxClick",
            "click .swapped.checkbox__label": "onSwappedCheckboxLabelClick",
            "click .submit": "submitSwappedWith"
        },

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
            console.log(this.model.toJSON());
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        onReservedCheckboxClick: function() {
            var reserved = this.$el.find(".reserved-swap.checkbox").prop("checked");

            this.model.save("reserved", reserved, {
                success: _.bind(function() {
                    this.showSuccessAlert();
                }, this),
                error: _.bind(function() {
                    this.showErrorAlert();
                }, this)
            });
        },

        onReservedCheckboxLabelClick: function(event) {
            event.preventDefault();

            if (this.$el.find(".reserved-swap.checkbox").prop("checked")) {
                this.model.save("reserved", false, {
                    success: _.bind(function() {
                        this.showSuccessAlert();
                        this.$el.find(".reserved-swap.checkbox").prop("checked", false);
                    }, this),
                    error: _.bind(function() {
                        this.showErrorAlert();
                    }, this)
                });
            } else {
                this.model.save("reserved", true, {
                    success: _.bind(function() {
                        this.showSuccessAlert();
                        this.$el.find(".reserved-swap.checkbox").prop("checked", true);
                    }, this),
                    error: _.bind(function() {
                        this.showErrorAlert();
                    }, this)
                });
            }
        },

        onSwappedCheckboxClick: function() {
            var swapped = this.$el.find(".swapped.checkbox").prop("checked");

            this.model.save("swapped", swapped, {
                success: _.bind(function() {
                    this.showSuccessAlert();
                }, this),
                error: _.bind(function() {
                    this.showErrorAlert();
                }, this)
            });
        },

        onSwappedCheckboxLabelClick: function(event) {
            event.preventDefault();

            if (this.$el.find(".swapped.checkbox").prop("checked")) {
                this.model.save("swapped", false, {
                    success: _.bind(function() {
                        this.showSuccessAlert();
                        this.$el.find(".swapped.checkbox").prop("checked", false);
                    }, this),
                    error: _.bind(function() {
                        this.showErrorAlert();
                    }, this)
                });
            } else {
                this.model.save("swapped", true, {
                    success: _.bind(function() {
                        this.showSuccessAlert();
                        this.$el.find(".swapped.checkbox").prop("checked", true);
                    }, this),
                    error: _.bind(function() {
                        this.showErrorAlert();
                    }, this)
                });
            }
        },

        submitSwappedWith: function() {
            var swappedWith = this.$el.find(".swapped-with__input").val();

            this.model.save("swappedWith", swappedWith, {
                success: _.bind(function() {
                    this.showSuccessAlert();
                }, this),
                error: _.bind(function() {
                    this.showErrorAlert();
                }, this)
            });
        },

        showSuccessAlert: function() {
            alertify.success("Sticker #" + this.model.id + " updated");
        },

        showErrorAlert: function() {
            alertify.error("Sticker #" + this.model.id + " not updated");
        },

        close: function() {
            this.stopListening();
        }

    });

})();
