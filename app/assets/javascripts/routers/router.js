GameUp.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.groupsCollection = new GameUp.Collections.Groups();
    this.eventsCollection = new GameUp.Collections.Events();
    this.groupsCollection.fetch();
    this.eventsCollection.fetch();
  },

  routes: {
    "": "groupsIndex",
    "groups/:id": "groupShow",
  },

  groupsIndex: function () {
    var view = new GameUp.Views.GroupsIndex({collection: this.groupsCollection});
    this.swapView(view)
  },

  groupShow: function(id) {
    var group = this.groupsCollection.getOrFetch(id);
    var view = new GameUp.Views.GroupShow({model: group});
    this.swapView(view);
  },

  swapView: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.$el)
    view.render();
  }
})
