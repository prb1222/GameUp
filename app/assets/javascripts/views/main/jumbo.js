GameUp.Views.Jumbo = Backbone.View.extend({
  template: JST['main/jumbo'],

  className: "jumbo-container",

  events: {
    "click .next-event-info": "goToEvent",
    "click #recommended-tag": "showRecommendation"
  },

  initialize: function () {
    this.currentUser = new GameUp.Models.User({id: GameUp.currentUser.userId});
    this.listenTo(this.currentUser, "sync", this.render);
    this.currentUser.num_my_events = undefined;
    this.currentUser.fetch({
      data: {flag: "index-jumbo"},
      success: function (user, response, options) {
        this.render();
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({currentUser: this.currentUser}));
    if (this.currentUser.num_my_events === 0) {
      this.$el.find('.next-event-info').removeClass('next-event-hover');
      this.$el.find('.calendar-image').remove();
      this.$el.find('.next-event-fields').remove();
      var $title = this.$el.find('.next-event-name');
      $title.after('<p style="color: #256e5d">You have no events yet! Join a group to sign up for events!</p>')
    }
    return this;
  },

  goToEvent: function (event) {
    if (!this.currentUser.num_my_events) {return;}
    var next_event = this.currentUser.next_event;
    Backbone.history.navigate("#groups/" + next_event.group_id + "/events/" + next_event.event_id, {trigger: true});
    var $target = $('.main-pane');
    $("html, body").animate({ scrollTop: $target.offset().top }, "slow");
  },

  showRecommendation: function(event) {
    event.preventDefault();
    var recommendedView = new GameUp.Views.RecommendedView();
    $('body').append(recommendedView.render().$el);
  },
});
