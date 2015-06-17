/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.SpareView = Backbone.View.extend({

        template: JST["app/scripts/templates/spare.ejs"],

        tagName: "li",

        id: "",

        className: "spares__list-item",

        events: {},

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();
