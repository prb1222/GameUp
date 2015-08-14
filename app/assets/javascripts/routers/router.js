GameUp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = options.currentUser;
  },

  routes: {
    "": "index",
    "groups": "groupsIndex",
    "groups/:id": "groupShow",
    "groups/:group_id/events/:event_id":"eventShow",
    "events": "eventsIndex"
  },

  index: function (options) {
    if (options && options.default === "events") {
      GameUp.events.fetch();
      var view = new GameUp.Views.IndexContainer({start: "events"});
    } else {
      GameUp.groups.fetch();
      var view = new GameUp.Views.IndexContainer({start: "groups"});
    }
    this.swapView(view)
  },

  groupsIndex: function () {
    this.index();
  },

  eventsIndex: function () {
    this.index({default: "events"})
  },

  groupShow: function(id) {
    var group = GameUp.groups.getOrFetch(id);
    var view = new GameUp.Views.GroupShow({model: group});
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
