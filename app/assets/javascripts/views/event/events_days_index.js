GameUp.Views.EventsDaysIndex = Backbone.CompositeView.extend({
  template: JST['event/events_days_index'],

  className: "events-days-index",

  initialize: function(options) {
    this.flag = options.flag;
    this.header = options.header;
    this.groupId = options.groupId
    this.findEvents();
  },

  render: function () {
    this.$el.html(this.template({header: this.header, events: this.collection}));
    this.attachSubviews();
    return this;
  },

  findEvents: function() {
    this.collection = new GameUp.Collections.Events();
    this.listenTo(this.collection, "sync", this.render);
    var self = this;
    this.collection.fetch({
      data: {flag: this.flag, groupId: this.groupId},
      success: function (collection) {
        var uniqueDates = self.collection.getUniqueDates();
        uniqueDates.forEach(function(uniqueDate){
          var dateCollection = new GameUp.Collections.Events();
          var dateEvents = self.collection.filterByDate(uniqueDate);
          dateCollection.set(dateEvents);
          var view = new GameUp.Views.EventsDayIndex({date: uniqueDate, collection: dateCollection});
          self.addSubview('ul.events-days-index', view);
        })
      }.bind(this)
    });
  },
})
