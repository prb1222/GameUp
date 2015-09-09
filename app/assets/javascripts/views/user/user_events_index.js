GameUp.Views.UserEventsIndex = Backbone.CompositeView.extend({
  template: JST['user/user_events_index'],

  className: "user-events-index",

  initialize: function () {
    this.selector = 'div.events-index-content';
    this.upcomingEvents = new GameUp.Views.EventsDaysIndex({
      flag: "myUpcomingEvents",
      header: "My Upcoming Events"});
    this.pastEvents = new GameUp.Views.EventsDaysIndex({
      flag: "upcomingEvents",
      header: "Upcoming Events"});
    this.listenTo(this.upcomingEvents, "render", this.tripEvent);
    this.listenTo(this.pastEvents, "render", this.tripEvent);
    this.showMyUpcoming();
  },

  events: {
    "click button.my-upcoming": "showMyUpcoming",
    "click button.upcoming": "showUpcoming",
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    this.trigger("render");
    return this;
  },

  tripEvent: function () {
    this.trigger('render');
  },

  showMyUpcoming: function () {
    this.removeSubviews(this.selector);
    this.addSubview(this.selector, this.upcomingEvents);
    this.render();
  },

  showUpcoming: function () {
    this.removeSubviews(this.selector);
    this.addSubview(this.selector, this.pastEvents);
    this.render();
  }
});
