GameUp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = options.currentUser;
    this.groupsCollection = new GameUp.Collections.Groups();
    this.eventsCollection = new GameUp.Collections.Events();
    this.groupsCollection.fetch();
    this.eventsCollection.fetch();
  },

  routes: {
    "": "groupsIndex",
    "groups": "groupsIndex",
    "groups/:id": "groupShow",
    "events": "eventsIndex",
    "events/:id": "eventShow"
  },

  groupsIndex: function () {
    var view = new GameUp.Views.GroupsIndex({collection: this.groupsCollection});
    this.swapView(view)
  },

  groupShow: function(id) {
    var group = this.groupsCollection.getOrFetch(id);
    var view = new GameUp.Views.GroupShow({model: group, currentUser: this.currentUser});
    this.swapView(view);
  },

  eventsIndex: function () {
    var view = new GameUp.Views.EventsIndex({collection: this.eventsCollection});
    this.swapView(view);
  },

  eventShow: function(id) {
    var event = this.eventsCollection.getOrFetch(id);
    var view = new GameUp.Views.EventShow({model: event});
    this.swapView(view);
  },

  swapView: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el)
    view.render();
  }
})
