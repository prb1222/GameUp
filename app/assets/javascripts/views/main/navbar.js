GameUp.Views.NavBar = Backbone.View.extend({
  template: JST['main/navbar'],

  className: "navbar",

  initialize: function (options) {
    this.currentUser = options.currentUser;
  },

  render: function() {
    var content = this.template({currentUser: this.currentUser})
    this.$el.html(content);
    return this;
  }
});
