GameUp.Views.EventItem = Backbone.View.extend({
  template: JST['event/event_item'],

  tagName: 'li',

  // className: "container",

  initialize: function () {
    this.listenTo(this.model, "sync change:title", this.render);
    this.model.fetch();
  },

  render: function () {
    var content = this.template({event: this.model});
    this.$el.html(content);
    return this;
  },
})
