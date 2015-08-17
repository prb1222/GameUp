GameUp.Views.UserEventsIndex = Backbone.CompositeView.extend({
  template: JST['user/user_events_index'],

  className: "user-events-index",

  initialize: function () {
    this.selector = 'div.events-index-content';
    this.showMyUpcoming();
  },

  events: {
    "click button.my-upcoming": "showMyUpcoming",
    "click button.upcoming": "showUpcoming",
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  showMyUpcoming: function () {
    if (!this.upcomingEvents) {
      this.upcomingEvents = new GameUp.Views.EventsDaysIndex({
        flag: "myUpcomingEvents",
        header: "My Upcoming Events"});
    }
    this.removeSubviews(this.selector);
    this.addSubview(this.selector, this.upcomingEvents);
    this.render();
  },

  showUpcoming: function () {
    if (!this.pastEvents) {
      this.pastEvents = new GameUp.Views.EventsDaysIndex({
        flag: "upcomingEvents",
        header: "Upcoming Events"});
    }
    this.removeSubviews(this.selector);
    this.addSubview(this.selector, this.pastEvents);
    this.render();
  }
});
