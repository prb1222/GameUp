GameUp.Views.GroupJumbo = Backbone.View.extend({
  template: JST['group/group_jumbo'],

  className: "group-jumbo",

  events: {
    "click .image-container":"upload"
  },

  prevent: function (event) {
    event.preventDefault();
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.jumboPic(), "change:id", this.render)
  },

  render: function () {
    this.$el.html(this.template({group: this.model}));
    var $jumboNav = this.$el.find('div.image-container');
    if (this.model.owned) {
      $jumboNav.addClass('hover-fix');
    }
    var width = $jumboNav.width();
    if (this.model.jumboPic().get('image_url')) {
      $jumboNav.css("background-image", 'url(' + this.model.jumboPic().get("image_url") + ')');
    }
    return this;
  },

  upload: function (event) {
    if ($(event.currentTarget).attr('class') === "group-jumbo-link-text" || $(event.currentTarget).attr('class') === "jumbotron group-nav") {
      return;
    } else if (!this.model.owned) {
      return;
    } else if (this.disabled) {
      return;
    }
    this.disabled = true;
    var image = new GameUp.Models.Image({imageable_type: "Group",
                                         imageable_id: this.model.get('id')
                                       });
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result) {
      if (error) {return;}
      var data = result[0];
      image.set({image_url: data.url});
      image.save({}, {
        success: function (model) {
          this.model.jumboPic().set({image_url: model.get('image_url'), id: model.get('id')});
          this.model.images().add(model);
          this.model.save({jumbo_id: model.get('id')}, {success: this.render.bind(this)});
        }.bind(this)
      });
    }.bind(this));
    this.image = image;
    this.disabled = false;
  }
});
