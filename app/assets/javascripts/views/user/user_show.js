GameUp.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/user_show'],

  initialize: function () {
    this.listenTo(this.model.groups, "sync", this.render);
    var groupsView = new GameUp.Views.GroupsIndex({collection: this.model.groups(), title: "MY GROUPS"});
    this.addSubview('div.groups-index', groupsView);
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }


});
