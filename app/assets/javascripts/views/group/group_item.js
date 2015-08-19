GameUp.Views.GroupItem = Backbone.View.extend({
  template: JST['group/group_item'],

  tagName: "li",

  className: "group-item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.members(),"sync", this.render);
    this.listenTo(this.model.profilePic(), "sync", this.render);
    this.model.profilePic().fetch();
    this.model.members().fetch({data: {flag: "groupMembers", groupId: this.model.get('id')}});
  },

  render: function () {
    var content = this.template({group: this.model});
    this.$el.html(content);
    return this;
  }
})
