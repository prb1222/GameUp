GameUp.Views.SearchBar = Backbone.CompositeView.extend({
  template: JST['main/search_bar'],

  className: "group-search-bar",

  events: {
    "submit form.group-search-form":"submitSearch"
  },

  initialize: function () {
    var myGroups = new GameUp.Collections.Groups();
    var otherGroups = new GameUp.Collections.Groups();
    myGroups.fetch({data: {flag: "mine"}});
    otherGroups.fetch({data: {flag: "other", distance: 20}});
    this.otherGroupsView = new GameUp.Views.GroupsIndex({collection: otherGroups, title: "Other Groups within 20 mi"});
    this.myGroupsView = new GameUp.Views.GroupsIndex({collection: myGroups, title: "My Groups"});
    var selector = 'div.groups-indeces';
    this.addSubview(selector, this.myGroupsView);
    this.addSubview(selector, this.otherGroupsView);
  },

  render: function () {
    var content = this.template({distance: this.distance});
    this.$el.html(content);
    return this;
  },

  submitSearch: function (event) {
    event.preventDefault();
    var $input = this.$el.find('.distance-input');
    if (!$input.val()) {return;}
    var distance = $input.val();
    $input.val("");
    var selector = 'div.groups-indeces';
    this.removeSubview(selector, this.otherGroupsView);
    var searchGroups = new GameUp.Collections.Groups();
    searchGroups.fetch({data: {flag: "other", distance: distance}});
    this.otherGroupsView = new GameUp.Views.GroupsIndex({collection: searchGroups, title: "Other Groups within " + distance + " mi"});
    this.addSubview(selector, this.otherGroupsView);
  }
});