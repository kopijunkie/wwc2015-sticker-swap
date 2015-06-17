/*global StickerSwapInventory, Backbone, JST*/

StickerSwapInventory.Views = StickerSwapInventory.Views || {};

(function () {
    "use strict";

    StickerSwapInventory.Views.SparesListView = Backbone.View.extend({

        template: JST["app/scripts/templates/spares.ejs"],

        tagName: "ul",

        id: "",

        className: "spares__list",

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
