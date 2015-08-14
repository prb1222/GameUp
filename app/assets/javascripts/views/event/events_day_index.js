GameUp.Views.EventsDayIndex = Backbone.CompositeView.extend({
  template: JST['event/events_day_index'],

  initialize: function(options) {
    this.date = options.date;
    this.collection.each(function(event){
      this.addEventSubview(event);
    }.bind(this));
    this.render();
  },

  render: function () {
    this.$el.html(this.template({date: this.date}));
    this.attachSubviews();
    return this;
  },

  addEventSubview: function (event) {
    var subView = new GameUp.Views.EventItem({model: event});
    this.addSubview('ul.events-day-index', subView);
  }
})
