GameUp.Views.ImageItem = Backbone.View.extend({
  template: JST['image/image_item'],

  tagName: "li",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({image: this.model});
    this.$el.html(content);
    return this;
  }
})
