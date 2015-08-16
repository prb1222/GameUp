GameUp.Views.IndexContainer = Backbone.CompositeView.extend({
  template: JST['main/index_container'],

  initialize: function (options) {
    this.addJumbotron();
    if (options.start === "events") {
      this.addEventsIndeces();
    } else {
      this.addGroupsIndeces();
    }
  },

  events: {
    "click button#show-groups-index": "addGroupsIndeces",
    "click button#show-events-index": "addEventsIndeces"
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
    var selector = 'div.index-container';
    this.removeSubviews(selector);
    var myGroups = new GameUp.Collections.Groups();
    var otherGroups = new GameUp.Collections.Groups();
    myGroups.fetch({data: {flag: "mine"}});
    otherGroups.fetch({data: {flag: "other"}});
    otherGroupsView = new GameUp.Views.GroupsIndex({collection: otherGroups, title: "OTHER GROUPS"});
    myGroupsView = new GameUp.Views.GroupsIndex({collection: myGroups, title: "MY GROUPS"});
    this.addSubview(selector, myGroupsView);
    this.addSubview(selector, otherGroupsView);
  },

  addEventsIndeces: function () {
    var selector = 'div.index-container';
    this.removeSubviews(selector);
    var eventsIndexView = new GameUp.Views.EventsDaysIndex({flag: "myUpcomingEvents"});
    this.addSubview(selector, eventsIndexView);
  }
});
