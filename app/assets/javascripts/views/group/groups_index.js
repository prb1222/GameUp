GameUp.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['group/groups_index'],

  className: "groups-index",

  initialize: function(options) {
    this.titleDiv = options.title;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addGroupSubview);
    this.collection.each(function(group){
      this.addGroupSubview(group);
    }.bind(this));
    $(window).on("resize",this.resizeList.bind(this));
  },

  render: function () {
    this.$el.html(this.template({title: this.titleDiv, groups: this.collection}));
    this.resizeList();
    this.attachSubviews();
    return this;
  },

  addGroupSubview: function (group) {
    var subView = new GameUp.Views.GroupItem({model: group});
    this.addSubview('ul.groups-index', subView);
    this.render();
  },

  resizeList: function (event) {
    var listWidth = this.$el.width();
    var list = this.$el.find('ul.groups-index');
    list.css('width', Math.floor(listWidth / 318) * 318);
    list.css('margin-left', ((listWidth / 318) % 1) * 159)
  },

  remove: function() {
    $(window).off("resize",this.resizeList);
    //call the superclass remove method
    Backbone.View.prototype.remove.apply(this, arguments);
  }

})
