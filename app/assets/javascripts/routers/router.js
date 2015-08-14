GameUp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = options.currentUser;
    this.eventsCollection = new GameUp.Collections.Events();
    this.eventsCollection.fetch();
  },

  routes: {
    "": "groupsIndex",
    "groups": "groupsIndex",
    "groups/:id": "groupShow",
    "groups/:group_id/events/:event_id":"eventShow",
    "events": "eventsIndex"
  },

  groupsIndex: function () {
    GameUp.groups.fetch();
    var view = new GameUp.Views.GroupsIndex({collection: GameUp.groups});
    this.swapView(view)
  },

  groupShow: function(id) {
    var group = GameUp.groups.getOrFetch(id);
    var view = new GameUp.Views.GroupShow({model: group});
    this.swapView(view);
  },

  eventsIndex: function () {
    var view = new GameUp.Views.EventsIndex({collection: this.eventsCollection});
    this.swapView(view);
  },

  eventShow: function(group_id, event_id) {
    var group = GameUp.groups.getOrFetch(group_id);
    var view = new GameUp.Views.GroupShow({model: group,
                                           startPage: "eventShow",
                                           eventId: event_id});
    this.swapView(view);
  },

  swapView: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el)
    view.render();
  }
})
