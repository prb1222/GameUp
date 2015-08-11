GameUp.Views.GroupShow = Backbone.CompositeView.extend({
  template: JST['group/group_show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.addSidebar);
    this.listenTo(this.model, "sync", this.addEventsFeed);
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
  }
});
