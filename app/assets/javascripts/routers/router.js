GameUp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  addNavbar: function () {
    this.navBar = this.navBar || new GameUp.Views.NavBar({currentUser: GameUp.currentUser,
                                        router: this});
    this.$rootEl.prepend(this.navBar.render().$el);
  },

  routes: {
    "": "index",
    "groups": "groupsIndex",
    "groups/new":"groupNew",
    "groups/:id": "groupShow",
    "groups/:group_id/events/:event_id":"eventShow",
    "events": "eventsIndex",
    "users/:id":"userShow"
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

  groupNew: function () {
    var group = new GameUp.Models.Group();
    var view = new GameUp.Views.GroupNew({model: group});
    this.swapView(view);
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

  userShow: function (id) {
    var user = new GameUp.Models.User({ id: id });
    var view = new GameUp.Views.UserShow({model: user});
    user.fetch();
    this.swapView(view);
  },

  swapView: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el);
    view.render();
    this.addNavbar();
  }
})
