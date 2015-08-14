GameUp.Views.EventsDaysIndex = Backbone.CompositeView.extend({
  template: JST['event/events_days_index'],

  initialize: function() {
    var eventsCollection = new GameUp.Collections.Events();
    var self = this;
    eventsCollection.fetch({
      data: {flag: "myUpcomingEvents"},
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

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addEventSubview: function (event) {
    var subView = new GameUp.Views.EventItem({model: event});
    this.addSubview('ul.events-days-index', subView);
  }
})
