GameUp.Views.GroupEventsIndex = Backbone.CompositeView.extend({
  template: JST['group/group_events_index'],

  className: "group-events-index",

  initialize: function () {
    this.selector = 'div.events-index-content';
    this.showUpcoming();
  },

  events: {
    "click button.upcoming": "showUpcoming",
    "click button.past": "showPast",
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  showUpcoming: function () {
    if (!this.upcomingEvents) {
      this.upcomingEvents = new GameUp.Views.EventsDaysIndex({
        flag: "groupUpcomingEvents",
        groupId: this.model.get('id'),
        header: "Upcoming Events"});
    }
    this.removeSubviews(this.selector);
    this.addSubview(this.selector, this.upcomingEvents);
    this.render();
  },

  showPast: function () {
    if (!this.pastEvents) {
      this.pastEvents = new GameUp.Views.EventsDaysIndex({
        flag: "groupPastEvents",
        groupId: this.model.get('id'),
        header: "Past Events"});
    }
    this.removeSubviews(this.selector);
    this.addSubview(this.selector, this.pastEvents);
    this.render();
  }
});
