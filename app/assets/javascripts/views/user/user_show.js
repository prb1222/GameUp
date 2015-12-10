GameUp.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/user_show'],

  className: "user-show content-padding container",

  events: {
    "click div.user-show-bio":"editBio",
    "click div.user-image":"editImage",
    "click .genre-index-view":"showGenreModal"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.groups(), "sync", this.render);
    this.listenTo(this.model.genres(), "sync add remove", this.render);
    this.listenTo(this.model.image(), "change sync", this.render);
    var groupsView = new GameUp.Views.GroupsIndex({collection: this.model.groups(), title: "MY GROUPS"});
    this.addSubview('div.groups-index', groupsView);
    var genresView = new GameUp.Views.GenreIndex({selected: false, selectable: false, collection: this.model.genres(), singleColumn: true});
    this.addSubview('div.genres-index-container', genresView);
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    if (this.model.isUser) {
      this.$el.find('.user-image').addClass('hover-fix');
      this.$el.find('.user-bio').addClass('hover-fix');
      this.$el.find('.user-show-bio-display').addClass('hover-fix');
      this.$el.find('.genre-index-view').addClass('hover-fix');
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
    var $textarea = this.modal.$el.find('textarea');
    var text = $textarea.val();
    $textarea.val("");
    $textarea.focus();
    $textarea.val(text);
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
  },

  showGenreModal: function (event) {
    if (this.genreModal || !this.model.isUser) {return;}
    this.genreModal = new GameUp.Views.GenreModal({
      collection: this.model.genres(),
      cancel: this.removeGenreModal.bind(this),
      submit: this.changeGenreGroups.bind(this)
    })
    $('body').append(this.genreModal.render().$el);
    $("html, body").animate({ scrollTop: 150 }, "slow");
  },

  removeGenreModal: function () {
    this.genreModal.remove();
    this.genreModal = null;
  },

  changeGenreGroups: function (genres) {
    var currentCollection = this.model.genres();
    var self = this;
    var options = {
      genreArray: genres.join(", "),
      modelId: this.model.get('id'),
      modelType: "User"
    }

    currentCollection.sync("create", currentCollection, {
      data: jQuery.param(options, true),
      success: function (collection, response, options) {
        this.reset(collection);
      }.bind(currentCollection),

      complete: function (jqXHR, statusString) {
        this.removeGenreModal();
      }.bind(self)
    });
  }
});
