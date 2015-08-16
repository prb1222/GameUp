GameUp.Views.EventsDaysIndex = Backbone.CompositeView.extend({
  template: JST['event/events_days_index'],

  events: {
    "click .my-events":"showMyEvents",
    "click .upcoming-events":"showUpcomingEvents"
  },

  initialize: function(options) {
    this.flag = options.flag;
    this.header = "My Upcoming Events"
    this.findEvents();
  },

  render: function () {
    this.$el.html(this.template({header: this.header}));
    this.attachSubviews();
    return this;
  },

  showMyEvents: function () {
    this.removeSubviews('ul.events-days-index');
    this.header = "My Upcoming Events";
    this.flag = "myUpcomingEvents";
    this.findEvents();
    this.render();
  },

  showUpcomingEvents: function () {
    this.removeSubviews('ul.events-days-index');
    this.header = "Upcoming Events";
    this.flag = "upcomingEvents";
    this.findEvents();
    this.render();
  },

  findEvents: function() {
    var eventsCollection = new GameUp.Collections.Events();
    var self = this;
    eventsCollection.fetch({
      data: {flag: this.flag},
      success: function () {
        var uniqueDates = eventsCollection.getUniqueDates();
        uniqueDates.forEach(function(uniqueDate){
          var dateCollection = new GameUp.Collections.Events();
          var dateEvents = eventsCollection.filterByDate(uniqueDate);
          dateCollection.set(dateEvents);
          var view = new GameUp.Views.EventsDayIndex({date: uniqueDate, collection: dateCollection});
          self.attachSubview('ul.events-days-index', view);
        })
      }.bind(this)
    });
  },
})
