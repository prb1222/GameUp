GameUp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['group/group_show'],

  events: {
    "click button.new-event": "addEventForm"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.addSidebar);
    this.listenTo(this.model, "sync", this.addEventsFeed);
    this.listenTo(this.model.meets(), "add", this.addEventItem);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSidebar: function (model) {
    $('div.sidebar').empty();
    var sidebar = new GameUp.Views.GroupDetail({model: this.model});
    this.addSubview('div.sidebar', sidebar);
  },

  addEventsFeed: function (model) {
    model.meets().each(function(event){
      var subView = new GameUp.Views.EventItem({model: event});
      this.addSubview('ul.events-feed', subView);
    }.bind(this));
  },

  addEventItem: function(event) {
    var subView = new GameUp.Views.EventItem({model: event});
    this.addSubview('ul.events-feed', subView)
  },

  addEventForm: function(event) {
    event.preventDefault();
    $('div.event-form').empty();
    var event = new GameUp.Models.Event();
    var subview = new GameUp.Views.EventForm({model: event, collection: this.model.meets()});
    this.addSubview('div.event-form', subview);
  }
});
