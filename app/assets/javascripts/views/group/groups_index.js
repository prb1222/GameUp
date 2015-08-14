GameUp.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['group/groups_index'],

  events: {
    "click button#new-group": "groupForm"
  },

  initialize: function(options) {
    this.titleDiv = options.title;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addGroupSubview);
    this.collection.each(function(group){
      this.addGroupSubview(group);
    }.bind(this));
  },

  render: function () {
    this.$el.html(this.template({title: this.titleDiv}));
    this.attachSubviews();
    return this;
  },

  addGroupSubview: function (group) {
    if (this.groupFormView) {
      this.removeSubview('div.group-form', this.groupFormView)
    }
    var subView = new GameUp.Views.GroupItem({model: group});
    this.addSubview('ul.groups-index', subView);

  },

  groupForm: function (event) {
    if (this.groupFormView) {
      this.removeSubview('div.group-form', this.groupFormView)
    }
    event.preventDefault();
    $('div.group-form').empty();
    var group = new GameUp.Models.Group();
    this.groupFormView = new GameUp.Views.GroupForm({model: group, collection: this.collection, verb: "Create"});
    this.addSubview('div.group-form', this.groupFormView);
  }
})
