GameUp.Views.EventItem = Backbone.View.extend({
  template: JST['event/event_item'],

  tagName: 'li',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  }
})
