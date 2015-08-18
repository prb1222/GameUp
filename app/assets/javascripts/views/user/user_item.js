GameUp.Views.UserItem = Backbone.View.extend({
  template: JST['user/user_item'],

  tagName: 'li',

  initialize: function () {
    this.listenTo(this.model, "sync change:title", this.render);
    this.listenTo(this.model.image(), "sync", this.render)
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },
})
