GameUp.Views.Jumbo = Backbone.View.extend({
  template: JST['main/jumbo'],

  className: "jumbo-container",
  
  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
