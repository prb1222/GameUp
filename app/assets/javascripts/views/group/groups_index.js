GameUp.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['group/groups_index'],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addGroupSubview);
    this.collection.each(function(group){
      this.addGroupSubview(group);
    }.bind(this));
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addGroupSubview: function (group) {
    var subView = new GameUp.Views.GroupItem({model: group});
    this.addSubview('ul.groups-index', subView);
  }
})
