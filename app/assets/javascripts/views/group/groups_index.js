GameUp.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['group/groups_index'],

  events: {
    "click button#new-group": "groupForm"
  },

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
  },

  groupForm: function (event) {
    event.preventDefault();
    $('div.group-form').empty();
    var group = new GameUp.Models.Group();
    var subview = new GameUp.Views.GroupForm({model: group, collection: this.collection});
    this.addSubview('div.group-form', subview);
  }
})
