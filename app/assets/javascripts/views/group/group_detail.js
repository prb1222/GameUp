GameUp.Views.GroupDetail = Backbone.View.extend({
  template: JST['group/group_detail'],

  className: "group-detail-view",

  attributes: function () {
    return {
      "data-id": this.model.id
    }
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({group: this.model});
    this.$el.html(content);
    return this;
  }
})
