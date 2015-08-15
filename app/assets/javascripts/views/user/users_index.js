GameUp.Views.UsersIndex = Backbone.CompositeView.extend({
  template: JST['user/users_index'],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addUserSubview);
    this.listenTo(this.collection, "remove", this.removeUserSubview);
    this.collection.each(function(user){
      this.addUserSubview(user);
    }.bind(this));
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addUserSubview: function (user) {
    var subView = new GameUp.Views.UserItem({model: user});
    this.addSubview('ul.users-index', subView);
  },

  removeUserSubview: function (user) {
    this.subviews('ul.users-index').forEach(function(subview){
      if (subview.model.get("id") === user.id) {
        this.removeSubview('ul.users-index', subview);
      }
    }.bind(this))
  }
})
