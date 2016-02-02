this.JST=this.JST||{},this.JST["app/scripts/templates/need.ejs"]=function(a){var b,c="";_.escape;return c+='<div class="sticker">\n    <h3 class="h4 sticker__heading">Need Sticker # '+(null==(b=a.id)?"":b)+'</h3>\n\n    <div class="checkbox__container">\n        <input type="checkbox" name="found-swap" class="found-swap checkbox checked-icon"\n            '+(null==(b=a.found?'checked="checked"':"")?"":b)+' />\n        <label for="found-swap" class="found-swap checkbox__label">Found Swap</label>\n    </div>\n\n    <div class="checkbox__container">\n        <input type="checkbox" name="swapped" class="swapped checkbox checked-icon"\n            '+(null==(b=a.swapped?'checked="checked"':"")?"":b)+' />\n        <label for="swapped" class="swapped checkbox__label">Swapped</label>\n    </div>\n\n    <div class="input-group swapped-with">\n        <input type="text" name="swapped-with" class="form-control swapped-with__input"\n                placeholder="Swapped With..." maxlength="32" value="'+(null==(b=a.swappedWith)?"":b)+'" />\n        <span class="input-group-btn">\n            <button type="submit" class="btn btn-default submit">OK</button>\n        </span>\n    </div>\n</div>\n'},this.JST["app/scripts/templates/needs.ejs"]=function(a){var b="";_.escape;return b+='<h2 class="header__text">Needs List</h2>\n\n<button type="button" class="btn btn-primary add">\n    <i class="glyphicon glyphicon-plus icon" aria-hidden="true"></i>\n    Add Stickers\n</button>\n<button type="button" class="btn btn-primary hide-ui">Hide</button>\n\n<form name="add-stickers-needed" class="add-stickers-needed">\n    <textarea name="stickers-needed" rows="10" class="stickers__input" placeholder="Enter sticker ID (comma separated for multiple sticker IDs, e.g. \'1, 2, 3\')"></textarea>\n    <fieldset>\n        <button type="reset" class="btn btn-default clear">Clear</button>\n        <button type="submit" class="btn btn-default submit">Submit</button>\n    </fieldset>\n</form>\n\n<ul id="needs-list" class="stickers__list stickers__list--needs list-unstyled"></ul>\n'},this.JST["app/scripts/templates/spare.ejs"]=function(a){var b,c="";_.escape;return c+='<div class="sticker">\n    <h3 class="h4 sticker__heading">Got Sticker # '+(null==(b=a.stickerId)?"":b)+'</h3>\n\n    <div class="checkbox__container">\n        <input type="checkbox" name="reserved-swap" class="reserved-swap checkbox checked-icon"\n            '+(null==(b=a.reserved?'checked="checked"':"")?"":b)+' />\n        <label for="reserved-swap" class="reserved-swap checkbox__label">Reserved</label>\n    </div>\n\n    <div class="checkbox__container">\n        <input type="checkbox" name="swapped" class="swapped checkbox checked-icon"\n            '+(null==(b=a.swapped?'checked="checked"':"")?"":b)+' />\n        <label for="swapped" class="swapped checkbox__label">Swapped</label>\n    </div>\n\n    <div class="input-group swapped-with">\n        <input type="text" name="swapped-with" class="form-control swapped-with__input"\n                placeholder="Swapped With..." maxlength="32" value="'+(null==(b=a.swappedWith)?"":b)+'" />\n        <span class="input-group-btn">\n            <button type="submit" class="btn btn-default submit">OK</button>\n        </span>\n    </div>\n</div>\n'},this.JST["app/scripts/templates/spares.ejs"]=function(a){var b="";_.escape;return b+='<h2 class="header__text">Spares List</h2>\n\n<button type="button" class="btn btn-primary add">\n    <i class="glyphicon glyphicon-plus icon" aria-hidden="true"></i>\n    Add Stickers\n</button>\n<button type="button" class="btn btn-primary hide-ui">Hide</button>\n\n<form name="add-spare-stickers" class="add-spare-stickers">\n    <textarea name="spare-stickers" rows="10" class="stickers__input" placeholder="Enter sticker ID (comma separated for multiple sticker IDs, e.g. \'1, 2, 3\')"></textarea>\n    <fieldset>\n        <button type="reset" class="btn btn-default clear">Clear</button>\n        <button type="submit" class="btn btn-default submit">Submit</button>\n    </fieldset>\n</form>\n\n<ul id="spares-list" class="stickers__list stickers__list--spares list-unstyled"></ul>\n'},window.StickerSwapInventory={Models:{},Collections:{},Views:{},Routers:{},init:function(){"use strict";var a=new this.Views.NeedsListView;$("#needs-region").append(a.el);var b=new this.Views.SparesListView;$("#spares-region").append(b.el)}},$(document).ready(function(){"use strict";StickerSwapInventory.init()}),StickerSwapInventory.Models=StickerSwapInventory.Models||{},function(){"use strict";StickerSwapInventory.Models.NeedStickerModel=Backbone.Model.extend({defaults:{found:!1,swapped:!1,swappedWith:""},validate:function(a){a.swapped&&!a.found&&alertify.error("Sticker not marked as 'found' yet.")},parse:function(a){return{id:a.stickerId,found:a.found,swapped:a.swapped,swappedWith:a.swappedWith}}})}(),StickerSwapInventory.Collections=StickerSwapInventory.Collections||{},function(){"use strict";StickerSwapInventory.Collections.NeedsCollection=Backbone.Collection.extend({url:"/api/needs",model:StickerSwapInventory.Models.NeedStickerModel,comparator:function(a){return a.get("id")}})}(),StickerSwapInventory.Models=StickerSwapInventory.Models||{},function(){"use strict";StickerSwapInventory.Models.SpareStickerModel=Backbone.Model.extend({idAttribute:"_id",defaults:{_id:null,reserved:!1,swapped:!1,swappedWith:""},validate:function(a){a.swapped&&!a.reserved&&alertify.error("Sticker not marked as 'reserved' yet.")},parse:function(a){return console.log(a),{id:a._id,stickerId:a.stickerId,reserved:a.reserved,swapped:a.swapped,swappedWith:a.swappedWith}}})}(),StickerSwapInventory.Collections=StickerSwapInventory.Collections||{},function(){"use strict";StickerSwapInventory.Collections.SparesCollection=Backbone.Collection.extend({url:"/api/spares",model:StickerSwapInventory.Models.SpareStickerModel,comparator:function(a){return a.get("stickerId")}})}(),StickerSwapInventory.Views=StickerSwapInventory.Views||{},function(){"use strict";StickerSwapInventory.Views.NeedView=Backbone.View.extend({template:JST["app/scripts/templates/need.ejs"],tagName:"li",className:"stickers__list-item needs__list-item",events:{"click .found-swap.checkbox":"onFoundCheckboxClick","click .found-swap.checkbox__label":"onFoundCheckboxLabelClick","click .swapped.checkbox":"onSwappedCheckboxClick","click .swapped.checkbox__label":"onSwappedCheckboxLabelClick","click .submit":"submitSwappedWith"},initialize:function(){this.listenTo(this.model,"change",this.render)},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},onFoundCheckboxClick:function(){var a=this.$el.find(".found-swap.checkbox").prop("checked");this.model.save("found",a,{success:_.bind(function(){this.showSuccessAlert()},this),error:_.bind(function(){this.showErrorAlert()},this)})},onFoundCheckboxLabelClick:function(a){a.preventDefault(),this.$el.find(".found-swap.checkbox").prop("checked")?this.model.save("found",!1,{success:_.bind(function(){this.showSuccessAlert(),this.$el.find(".found-swap.checkbox").prop("checked",!1)},this),error:_.bind(function(){this.showErrorAlert()},this)}):this.model.save("found",!0,{success:_.bind(function(){this.showSuccessAlert(),this.$el.find(".found-swap.checkbox").prop("checked",!0)},this),error:_.bind(function(){this.showErrorAlert()},this)})},onSwappedCheckboxClick:function(){var a=this.$el.find(".swapped.checkbox").prop("checked");this.model.save("swapped",a,{success:_.bind(function(){this.showSuccessAlert()},this),error:_.bind(function(){this.showErrorAlert()},this)})},onSwappedCheckboxLabelClick:function(a){a.preventDefault(),this.$el.find(".swapped.checkbox").prop("checked")?this.model.save("swapped",!1,{success:_.bind(function(){this.showSuccessAlert(),this.$el.find(".swapped.checkbox").prop("checked",!1)},this),error:_.bind(function(){this.showErrorAlert()},this)}):this.model.save("swapped",!0,{success:_.bind(function(){this.showSuccessAlert(),this.$el.find(".swapped.checkbox").prop("checked",!0)},this),error:_.bind(function(){this.showErrorAlert()},this)})},submitSwappedWith:function(){var a=this.$el.find(".swapped-with__input").val();this.model.save("swappedWith",a,{success:_.bind(function(){this.showSuccessAlert()},this),error:_.bind(function(){this.showErrorAlert()},this)})},showSuccessAlert:function(){alertify.success("Sticker #"+this.model.id+" updated")},showErrorAlert:function(){alertify.error("Sticker #"+this.model.id+" not updated")},close:function(){this.stopListening()}})}(),StickerSwapInventory.Views=StickerSwapInventory.Views||{},function(){"use strict";StickerSwapInventory.Views.NeedsListView=Backbone.View.extend({template:JST["app/scripts/templates/needs.ejs"],className:"stickers-needed",events:{"click .add":"showStickerIdsInput","click .hide-ui":"hideStickerIdsInput","click .clear":"clearText","click .submit":"submitStickerIds"},initialize:function(){this.collection=new StickerSwapInventory.Collections.NeedsCollection,this.collection.fetch(),this.render(),this.listenTo(this.collection,"add",this.renderNeed),this.listenTo(this.collection,"reset",this.render)},render:function(){this.collection.sort(),this.$el.append(this.template()),this.collection.each(function(a){this.renderNeed(a)},this)},renderNeed:function(a){var b=new StickerSwapInventory.Views.NeedView({model:a});this.$el.find("#needs-list").append(b.render().el)},showStickerIdsInput:function(){this.$el.find(".add-stickers-needed").slideDown(),this.$el.find(".add").hide(),this.$el.find(".hide-ui").show()},hideStickerIdsInput:function(){this.$el.find(".add-stickers-needed").slideUp(),this.$el.find(".add").show(),this.$el.find(".hide-ui").hide()},clearText:function(){this.$el.find(".stickers__input").val("")},submitStickerIds:function(a){a.preventDefault();var b=this.$el.find(".stickers__input").val(),c=b.split(","),d=0;_.each(c,_.bind(function(a){return a=a.trim(),$.isNumeric(a)?void this.collection.create({stickerId:a},{wait:!0,success:_.bind(function(){alertify.success("Sticker #"+a+" added!")},this),error:function(){alertify.error("Sticker #"+a+" not added!")}}):(d++,void alertify.error("Sticker ID '"+a+"' is not a number"))},this)),0===d&&this.clearText()},close:function(){this.stopListening()}})}(),StickerSwapInventory.Views=StickerSwapInventory.Views||{},function(){"use strict";StickerSwapInventory.Views.SparesListView=Backbone.View.extend({template:JST["app/scripts/templates/spares.ejs"],className:"spare-stickers",events:{"click .add":"showStickerIdsInput","click .hide-ui":"hideStickerIdsInput","click .clear":"clearText","click .submit":"submitStickerIds"},initialize:function(){this.collection=new StickerSwapInventory.Collections.SparesCollection,this.collection.fetch(),this.render(),this.listenTo(this.collection,"add",this.renderSpare),this.listenTo(this.collection,"reset",this.render)},render:function(){this.collection.sort(),this.$el.append(this.template()),this.collection.each(function(a){this.renderSpare(a)},this)},renderSpare:function(a){var b=new StickerSwapInventory.Views.SpareStickerView({model:a});this.$el.find("#spares-list").append(b.render().el)},showStickerIdsInput:function(){this.$el.find(".add-spare-stickers").slideDown(),this.$el.find(".add").hide(),this.$el.find(".hide-ui").show()},hideStickerIdsInput:function(){this.$el.find(".add-spare-stickers").slideUp(),this.$el.find(".add").show(),this.$el.find(".hide-ui").hide()},clearText:function(){this.$el.find(".stickers__input").val("")},submitStickerIds:function(a){a.preventDefault();var b=this.$el.find(".stickers__input").val(),c=b.split(","),d=0;_.each(c,_.bind(function(a){return a=a.trim(),$.isNumeric(a)?void this.collection.create({stickerId:a},{wait:!0,success:_.bind(function(){alertify.success("Sticker #"+a+" added!"),this.clearText()},this),error:function(){alertify.error("Sticker #"+a+" not added!")}}):(d++,void alertify.error("Sticker ID '"+a+"' is not a number"))},this)),0===d&&this.clearText()},close:function(){this.stopListening()}})}(),StickerSwapInventory.Views=StickerSwapInventory.Views||{},function(){"use strict";StickerSwapInventory.Views.SpareStickerView=Backbone.View.extend({template:JST["app/scripts/templates/spare.ejs"],tagName:"li",className:"stickers__list-item spares__list-item",events:{"click .reserved-swap.checkbox":"onReservedCheckboxClick","click .reserved-swap.checkbox__label":"onReservedCheckboxLabelClick","click .swapped.checkbox":"onSwappedCheckboxClick","click .swapped.checkbox__label":"onSwappedCheckboxLabelClick","click .submit":"submitSwappedWith"},initialize:function(){this.listenTo(this.model,"change",this.render),console.log(this.model.toJSON())},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},onReservedCheckboxClick:function(){var a=this.$el.find(".reserved-swap.checkbox").prop("checked");this.model.save("reserved",a,{success:_.bind(function(){this.showSuccessAlert()},this),error:_.bind(function(){this.showErrorAlert()},this)})},onReservedCheckboxLabelClick:function(a){a.preventDefault(),this.$el.find(".reserved-swap.checkbox").prop("checked")?this.model.save("reserved",!1,{success:_.bind(function(){this.showSuccessAlert(),this.$el.find(".reserved-swap.checkbox").prop("checked",!1)},this),error:_.bind(function(){this.showErrorAlert()},this)}):this.model.save("reserved",!0,{success:_.bind(function(){this.showSuccessAlert(),this.$el.find(".reserved-swap.checkbox").prop("checked",!0)},this),error:_.bind(function(){this.showErrorAlert()},this)})},onSwappedCheckboxClick:function(){var a=this.$el.find(".swapped.checkbox").prop("checked");this.model.save("swapped",a,{success:_.bind(function(){this.showSuccessAlert()},this),error:_.bind(function(){this.showErrorAlert()},this)})},onSwappedCheckboxLabelClick:function(a){a.preventDefault(),this.$el.find(".swapped.checkbox").prop("checked")?this.model.save("swapped",!1,{success:_.bind(function(){this.showSuccessAlert(),this.$el.find(".swapped.checkbox").prop("checked",!1)},this),error:_.bind(function(){this.showErrorAlert()},this)}):this.model.save("swapped",!0,{success:_.bind(function(){this.showSuccessAlert(),this.$el.find(".swapped.checkbox").prop("checked",!0)},this),error:_.bind(function(){this.showErrorAlert()},this)})},submitSwappedWith:function(){var a=this.$el.find(".swapped-with__input").val();this.model.save("swappedWith",a,{success:_.bind(function(){this.showSuccessAlert()},this),error:_.bind(function(){this.showErrorAlert()},this)})},showSuccessAlert:function(){alertify.success("Sticker #"+this.model.id+" updated")},showErrorAlert:function(){alertify.error("Sticker #"+this.model.id+" not updated")},close:function(){this.stopListening()}})}();