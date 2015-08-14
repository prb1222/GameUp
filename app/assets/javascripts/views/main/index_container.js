GameUp.Views.IndexContainer = Backbone.CompositeView.extend({
  template: JST['main/index_container'],

  initialize: function () {
    this.addJumbotron();
    this.addGroupsIndeces();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addJumbotron: function () {
    var jumboView = new GameUp.Views.Jumbo();
    this.addSubview(".jumbo-container",jumboView);
  },

  addGroupsIndeces: function () {
    if (this.indeces) {
      this.removeSubview('div.index-container', this.indeces);
    }
    var myGroups = new GameUp.Collections.Groups();
    var otherGroups = new GameUp.Collections.Groups();
    myGroups.fetch({data: {flag: "mine"}});
    otherGroups.fetch({data: {flag: "other"}});
    otherGroupsView = new GameUp.Views.GroupsIndex({collection: otherGroups});
    myGroupsView = new GameUp.Views.GroupsIndex({collection: myGroups});
    this.addSubview('div.index-container', myGroupsView);
    this.addSubview('div.index-container', otherGroupsView);
  }
});
