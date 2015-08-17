GameUp.Views.NavBar = Backbone.View.extend({
  template: JST['main/navbar'],

  className: "",

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.router, "route", this.changeNavbar)
    this.currentUser = options.currentUser;
  },

  render: function() {
    var content = this.template({currentUser: this.currentUser})
    this.$el.html(content);
    return this;
  },

  changeNavbar: function (route, params) {
    this.$el.find('.active').removeClass('active');
    if (route === "groupsIndex" || route === "eventsIndex") {
      this.$el.find('.groups-index-link').addClass('active');
    } else if (route === "groupNew") {
      this.$el.find('.group-new-link').addClass('active');
    } else if (route === "userShow" && params[0] === GameUp.currentUser.userId) {
      this.$el.find('.current-user-show').addClass('active')
    }
  }
});
