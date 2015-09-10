GameUp.Views.IndexContainer = Backbone.CompositeView.extend({
  template: JST['main/index_container'],

  className: "index-container-view content-padding",

  initialize: function (options) {
    this.searchBar = new GameUp.Views.SearchBar();
    this.eventsIndexView = new GameUp.Views.UserEventsIndex();
    this.addJumbotron();
    if (options.start === "events") {
      this.addEventsIndeces();
    } else {
      this.addGroupsIndeces();
    }
  },

  events: {
    "click button#show-groups-index": "addGroupsIndeces",
    "click button#show-events-index": "addEventsIndeces",
    "submit .group-search-form":"submitSearch"
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
    this.addSubview(selector, this.searchBar);
  },

  addEventsIndeces: function () {
    var selector = 'div.index-container';
    this.removeSubviews(selector);
    this.addSubview(selector, this.eventsIndexView);
  },

  submitSearch: function (event) {
    this.searchBar.submitSearch(event);
  }
});
