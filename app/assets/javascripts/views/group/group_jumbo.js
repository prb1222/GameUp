GameUp.Views.GroupJumbo = Backbone.View.extend({
  template: JST['group/group_jumbo'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({group: this.model}));
    return this;
  }
});
