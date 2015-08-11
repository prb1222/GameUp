GameUp.Views.GroupItem = Backbone.View.extend({
  template: JST['group/group_item'],

  tagName: "li",

  // events: {
  //   "click a": "navigate"
  // },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var content = this.template({group: this.model});
    this.$el.html(content);
    return this;
  }


})
