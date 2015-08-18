GameUp.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/user_show'],

  className: "user-show",
  events: {
    "click p.user-bio":"editBio",
    "click .c-background":"submitBio",
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
    this.attachSubviews();
    return this;
  },

  editBio: function (event) {
    event.preventDefault();
    var $div = $('p.user-bio');
    if (!this.model.isUser) {
      return;
    } else if (this.editing) {
      return;
    }
    this.editing = true;
    $div.empty();
    $form = $('<form>').addClass('user-form').append($('<textarea>'));
    $form.find('textarea').val(this.model.get('bio'));
    $background = $('<div>').addClass('c-background');
    $('.user-show').append($form).append($background);
    $form.find('textarea').focus();
  },

  submitBio: function (event) {
    event.preventDefault();
    var form = this.$el.find('.user-form textarea').val();
    if (form === "") {
      this.render();
      this.editing = false;
      return;
    }
    var $div = this.$el.find('p.user-bio');

    this.model.save({user: {bio: form}}, {
      success: function (model) {
        $('.user-form, c-background').remove();
        $div.empty();
        $div.html("Bio: <br>" + model.escape('bio'));
        this.editing = false;
      }.bind(this),

      error: function () {
        this.render();
        this.editing = false;
      }.bind(this)
    })
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
