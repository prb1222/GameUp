GameUp.Views.Jumbo = Backbone.View.extend({
  template: JST['main/jumbo'],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
