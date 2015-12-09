GameUp.Views.GroupDetail = Backbone.CompositeView.extend({
  template: JST['group/group_detail'],

  className: "group-detail-view",

  events: {
    "click button.toggle-membership": "toggleMembership",
    "click .delete-group": "promptForDeletion",
    "click .upload-image": "upload",
    "click .genre-index-view": "showGenreModal"
  },

  attributes: function () {
    return {
      "data-id": this.model.id
    }
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.members(), "add remove", this.render);
    this.listenTo(this.model.genres(), "add remove", this.render);
    this.listenTo(this.model.membership(), "change:id", this.render);
    this.genresIndexView = new GameUp.Views.GenreIndex({selectable: false, clickable: this.model.owned, collection: this.model.genres()});
    this.addSubview('div.genres-index-container', this.genresIndexView);
  },

  render: function () {
    var buttonText = this.model.is_member() ? "Leave group" : "Join group";
    var content = this.template({group: this.model, buttonText: buttonText});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  toggleMembership: function (event) {
    if (this.disabled) {return;}
    if (this.model.owned) {
      this.promptForDeletion();
      return;
    }
    this.disabled = true;
    event.preventDefault();
    if (this.model.membership().has("id")) {
      this.model.membership().destroy({
        success: function (membership) {
          this.model.members().remove(membership.get('user_id'));
          this.disabled = false;
          this.model.membership().clear();
          this.$('button.toggle-membership').text('Join Group');
        }.bind(this)
      });
    } else {
      this.model.membership().set({group_id: this.model.id});
      this.model.membership().save({},{
        success: function (membership) {
          var user = new GameUp.Models.User({id: membership.get("user_id")});
          user.fetch();
          this.model.members().add(user);
          this.$('button.toggle-membership').text('Leave Group');
          this.disabled = false;
        }.bind(this)
      });
    }
  },

  promptForDeletion: function () {
    if (this.confirmationModal) {return;}
    this.confirmationModal = new GameUp.Views.ConfirmationModal({
      noun: "group",
      success: this.deleteGroup.bind(this),
      cancel: this.removeModal.bind(this)
    })
    $('body').append(this.confirmationModal.render().$el);
    $("html, body").animate({ scrollTop: 150 }, "slow");
  },

  removeModal: function () {
    this.confirmationModal.remove();
    this.confirmationModal = null;
  },

  deleteGroup: function () {
    this.confirmationModal.remove();
    this.confirmationModal = null;
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("/#groups", {trigger: true});
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }.bind(this)
    })
  },

  upload: function (event) {
    if (this.disabled) {return;}
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
          this.model.profilePic().set({image_url: model.get('image_url')});
          this.model.images().add(model);
          this.model.save({profile_id: model.get('id')}, {
            success: function () {
              this.render();
            }.bind(this)});
        }.bind(this)
      });
    }.bind(this));
    this.image = image;
    this.disabled = false;
  },

  showGenreModal: function (event) {
    if (this.genreModal || !this.model.owned) {return;}
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
      modelType: "Group"
    }

    currentCollection.sync("create", currentCollection, {
      data: jQuery.param(options, true),
      success: function (collection, response, options) {
        this.reset(collection);
      }.bind(currentCollection),

      complete: function (jqXHR, statusString) {
        this.removeGenreModal();
        this.render();
      }.bind(self)
    });
  }
})
