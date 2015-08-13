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
    this.attachSubviews();
    if (this.model.owned) {
      var $button = $('<button>').addClass('new-event').text('Create Event');
      this.$el.find('div.sidebar').append($button);
    }
    return this;
  },

  addSidebar: function (model) {
    $('div.sidebar').empty();
    var sidebar = new GameUp.Views.GroupDetail({model: this.model});
    this.addSubview('div.sidebar', sidebar);
  },


  addEventForm: function(event) {
    event.preventDefault();
    $('div.event-form').empty();
    var event = new GameUp.Models.Event();
    var subview = new GameUp.Views.EventForm({model: event, collection: this.model.meets()});
    this.addSubview('div.event-form', subview);
  },

  showEvents: function (event) {
    var $div = $(event.currentTarget);
    var eventId = $div.data('event-id');
    var selector = 'div.main-pane';
    this.subviews(selector).forEach(function(subview){
      this.removeSubview(selector, subview);
    }.bind(this));
    var _event = this.model.meets().getOrFetch(eventId);
    var subView = new GameUp.Views.EventShow({model: _event});
    this.addSubview('div.main-pane', subView);
  },

  switchMainPane: function (event) {
    var selector = 'div.main-pane';
    this.subviews(selector).forEach(function(subview){
      this.removeSubview(selector, subview);
    }.bind(this));
    event.preventDefault();
    var $target = $(event.currentTarget);
    var type = $target.data("page-type");
    this["show" + type](event);
  },

  showHome: function () {
    this.addEventsFeed();
    this.render();
  },

  addEventsFeed: function () {
    $('div.main-pane').empty();
    var subView = new GameUp.Views.EventsIndex({collection: this.model.meets()});
    this.addSubview('div.main-pane', subView);
  },

  showMembers: function () {
    debugger;
  }
});
