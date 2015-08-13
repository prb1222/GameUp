GameUp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['group/group_show'],

  events: {
    "click button.new-event": "addEventForm",
    "click div.event-item": "showEvents",
    "click .group-nav a": "switchMainPane"
  },

  initialize: function (options) {
    this.addEventsFeed();
    this.listenTo(this.model, "sync", this.addSidebar);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.meets(), "add", this.addEventItem);
    var jumboView = new GameUp.Views.GroupJumbo({model: this.model});
    this.addSubview('div.jumbotron', jumboView);
  },

  render: function () {
    this.$el.html(this.template());
    if (this.model.owned) {
      var $button = $('<button>').addClass('new-event').text('Create Event');
      this.$el.find('div.events-feed').prepend($button);
    }
    this.attachSubviews();
    return this;
  },

  addSidebar: function (model) {
    $('div.sidebar').empty();
    var sidebar = new GameUp.Views.GroupDetail({model: this.model});
    this.addSubview('div.sidebar', sidebar);
  },

  addEventsFeed: function (model) {
    this.model.meets().each(this.addEventItem.bind(this));
  },

  addEventItem: function(event) {
    var subView = new GameUp.Views.EventItem({model: event});
    this.addSubview('ul.events-feed', subView);
  },

  addEventForm: function(event) {
    event.preventDefault();
    $('div.event-form').empty();
    var event = new GameUp.Models.Event();
    var subview = new GameUp.Views.EventForm({model: event, collection: this.model.meets()});
    this.addSubview('div.event-form', subview);
  },

  switchMainPane: function (event) {
    this.subviews('ul.events-feed').pop().remove();
    event.preventDefault();
    var $target = $(event.currentTarget);
    var type = $target.data("page-type");
    this["show" + type](event);
  },

  showEvents: function (event) {
    var $div = $(event.currentTarget);
    var eventId = $div.data('event-id');
    this.$('ul.events-feed').empty();
    var _event = this.model.meets().getOrFetch(eventId);
    var subView = new GameUp.Views.EventShow({model: _event});
    this.addSubview('ul.events-feed', subView);
  },

  showHome: function () {
    this.render();
  },

  showMembers: function () {
    debugger;
  }
});
