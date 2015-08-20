GameUp.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/user_show'],

  className: "user-show content-padding",

  events: {
    "click div.user-show-bio":"editBio",
    "click div.user-image":"editImage"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.groups(), "sync", this.render);
    this.listenTo(this.model.image(), "change sync", this.render);
    var groupsView = new GameUp.Views.GroupsIndex({collection: this.model.groups(), title: "MY GROUPS"});
    this.addSubview('div.groups-index', groupsView);
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    if (this.model.isUser) {
      this.$el.find('.user-image').addClass('hover-fix');
      this.$el.find('.user-bio').addClass('hover-fix');
      this.$el.find('.user-show-bio-display').addClass('hover-fix');
    }
    this.attachSubviews();
    return this;
  },

  editBio: function (event) {
    event.preventDefault();
    var $div = $('p.user-bio');
    if (!this.model.isUser) {
      return;
    }

    this.modal = new GameUp.Views.UserBioModal({model: this.model});
    $('body').append(this.modal.render().$el);
  },


  editImage: function () {
    if (this.disabled) {
      return;
    } else if (!this.model.isUser) {
      return;
    }
    this.disabled = true;
    var image = new GameUp.Models.Image({imageable_type: "User",
                                         imageable_id: this.model.get('id')
                                       });
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result) {
      if (error) {return;}
      var data = result[0];
      image.set({image_url: data.url});
      image.save({}, {
        success: function (model) {
          this.model.image().set({image_url: model.get('image_url')});
        }.bind(this)
      });
    }.bind(this));
    this.image = image;
    this.disabled = false;
  }
});
