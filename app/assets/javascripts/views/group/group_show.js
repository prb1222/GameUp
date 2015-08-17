GameUp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['group/group_show'],

  className: "group-show",

  events: {
    "click button.new-event": "addEventForm",
    "click div.event-item": "showEvents",
    "click .group-nav a": "switchMainPane",
    "click button.edit-group": "editGroupForm"
  },

  initialize: function (options) {
    if (options.startPage==='eventShow') {
      this.showEvents(options.eventId);
    } else {
      this.addEventsFeed();
    }
    this.listenTo(this.model, "sync", this.addSidebar);
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.meets(), "sync", this.render);
    this.listenTo(this.model.members(), "add remove", this.render)
    var jumboView = new GameUp.Views.GroupJumbo({model: this.model});
    this.addSubview('div.jumbotron-container', jumboView);
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addSidebar: function (model) {
    if (this.sidebar) {
      this.removeSubview('div.sidebar', this.sidebar);
    }
    this.sidebar = new GameUp.Views.GroupDetail({model: this.model});
    this.addSubview('div.sidebar', this.sidebar);
    if (this.model.owned) {
      var $button = $('<button>').addClass('new-event').text('Create Event');
      this.$el.find('div.sidebar').append($button);
    }
  },


  addEventForm: function(event) {
    var event = new GameUp.Models.Event();
    var formView = new GameUp.Views.EventForm({model: event, collection: this.model.meets()});
    $('body').append(formView.render().$el);
  },

  editGroupForm: function(event) {
    var formView = new GameUp.Views.GroupForm({model: this.model, collection: GameUp.groups, verb: "Edit" })
    $('body').append(formView.render().$el);
  },

  showEvents: function (event) {
    if (typeof event === "string") {
      var eventId = event;
    } else  {
      var $div = $(event.currentTarget);
      var eventId = $div.data('event-id');
      Backbone.history.navigate("#groups/" + this.model.id + "/events/" + eventId);
    }
    var selector = 'div.main-pane';
    this.subviews(selector).forEach(function(subview){
      this.removeSubview(selector, subview);
    }.bind(this));

    var callback = function (model) {
      var subView = new GameUp.Views.EventShow({model: model});
      this.addSubview(selector, subView);
    }.bind(this);

    var _event = this.model.meets().getOrFetch(eventId, callback);
  },

  switchMainPane: function (event) {
    var selector = 'div.main-pane';
    this.removeSubviews(selector);
    event.preventDefault();
    var $target = $(event.currentTarget);
    var type = $target.data("page-type");
    this["show" + type](event);
  },

  showHome: function () {
    this.addEventsFeed();
    Backbone.history.navigate("#groups/" + this.model.id);
  },

  addEventsFeed: function () {
    $('div.main-pane').empty();
    this.model.fetch();
    var subView = new GameUp.Views.EventsIndex({collection: this.model.meets()});
    this.addSubview('div.main-pane', subView);
  },

  showMembers: function () {
    var subView = new GameUp.Views.UsersIndex({collection: this.model.members()});
    this.addSubview('div.main-pane', subView);
  }
});
