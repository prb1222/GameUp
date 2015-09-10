GameUp.Views.Jumbo = Backbone.View.extend({
  template: JST['main/jumbo'],

  className: "jumbo-container",

  events: {
    "click .next-event-info": "goToEvent"
  },

  initialize: function () {
    this.currentUser = new GameUp.Models.User({id: GameUp.currentUser.userId});
    this.listenTo(this.currentUser, "sync", this.render);
    this.currentUser.fetch({
      data: {flag: "index-jumbo"},
      success: function (user) {
        this.render();
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({currentUser: this.currentUser}));
    return this;
  },

  goToEvent: function (event) {
    if (!this.currentUser.next_event) {return;}
    var next_event = this.currentUser.next_event;
    Backbone.history.navigate("#groups/" + next_event.group_id + "/events/" + next_event.event_id, {trigger: true});
    var $target = $('.main-pane');
    $("html, body").animate({ scrollTop: $target.offset().top }, "slow");
  }
});
