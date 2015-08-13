GameUp.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['event/event_show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({event: this.model}));
    this.attachSubviews();
    return this;
  }
})
