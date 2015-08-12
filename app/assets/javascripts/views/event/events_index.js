GameUp.Views.EventsIndex = Backbone.CompositeView.extend({
  template: JST['event/events_index'],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addEventSubview);
    this.collection.each(function(event){
      this.addEventSubview(event);
    }.bind(this));
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addEventSubview: function (event) {
    var subView = new GameUp.Views.EventItem({model: event});
    this.addSubview('ul.events-index', subView);
  }
})
