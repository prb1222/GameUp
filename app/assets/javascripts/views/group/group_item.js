GameUp.Views.GroupItem = Backbone.View.extend({
  template: JST['group/group_item'],

  tagName: "li",

  className: "group-item",

  events: {
    'mouseenter .group-background-image':"lightUp",
    'mouseleave .group-background-image':"lightDown",
    'mouseenter .group-title, .group-count':"lightUp"
  },

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
  },

  lightUp: function () {
    this.$el.find('.group-title').addClass('glowing');
  },

  lightDown: function () {
    this.$el.find('.group-title').removeClass('glowing');
  }
})
