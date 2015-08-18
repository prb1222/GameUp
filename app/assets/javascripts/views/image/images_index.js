GameUp.Views.ImagesIndex = Backbone.CompositeView.extend({
  template: JST['image/images_index'],

  className: "images-index",

  initialize: function(options) {
    this.titleDiv = options.title;
    this.ownerModel = options.ownerModel;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addImageSubview);
    this.collection.each(function(group){
      this.addImageSubview(group);
    }.bind(this));
  },

  render: function () {
    this.$el.html(this.template({title: this.titleDiv}));
    this.attachSubviews();
    return this;
  },

  addImageSubview: function (image) {
    var subView = new GameUp.Views.ImageItem({model: image, ownerModel: this.ownerModel});
    this.addSubview('ul.images-index', subView);
  }

})
