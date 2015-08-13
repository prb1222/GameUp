GameUp.Views.GroupJumbo = Backbone.View.extend({
  template: JST['group/group_jumbo'],

  render: function () {
    this.$el.html(this.template({group: this.model}));
    return this;
  }
});
