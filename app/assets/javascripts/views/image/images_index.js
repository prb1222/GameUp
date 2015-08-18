GameUp.Views.ImagesIndex = Backbone.CompositeView.extend({
  template: JST['image/images_index'],

  className: "images-index",

  events: {
    "click button.index-image-upload":"upload"
  },

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
    this.$el.html(this.template({title: this.titleDiv, group: this.ownerModel}));
    this.attachSubviews();
    return this;
  },

  addImageSubview: function (image) {
    var subView = new GameUp.Views.ImageItem({model: image, ownerModel: this.ownerModel});
    this.addSubview('ul.images-index', subView);
  },

  upload: function () {
    if (this.disabled) {return;}
    this.disabled = true;
    var image = new GameUp.Models.Image({imageable_type: "Group",
                                         imageable_id: this.ownerModel.get('id')
                                       });
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result) {
      if (error) {return;}
      var data = result[0];
      image.set({image_url: data.url});
      image.save({}, {
        success: function (model) {
          this.ownerModel.images().add(model);
        }.bind(this)
      });
    }.bind(this));
    this.image = image;
    this.disabled = false;
  }

})
