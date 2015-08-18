GameUp.Views.GroupDetail = Backbone.View.extend({
  template: JST['group/group_detail'],

  className: "group-detail-view",

  events: {
    "click button.toggle-membership": "toggleMembership",
    "click .delete-group": "deleteGroup",
    "click .upload-image": "upload"
  },

  attributes: function () {
    return {
      "data-id": this.model.id
    }
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.membership(), "change:id", this.render)
  },

  render: function () {
    var buttonText = this.model.is_member() ? "Leave group" : "Join group";
    var content = this.template({group: this.model, buttonText: buttonText});
    this.$el.html(content);
    if (this.model.owned) {
      var $button = $('<button>').addClass('delete-group').text("Delete Group");
      this.$el.append($button);
    }
    return this;
  },

  toggleMembership: function (event) {
    if (this.disabled) {return;}
    this.disabled = true;
    event.preventDefault();
    if (this.model.membership().has("id")) {
      this.model.membership().destroy({
        success: function (membership) {
          this.model.members().remove(membership.get('user_id'));
          this.disabled = false;
          this.model.membership().clear();
          this.$('button.toggle-membership').text('Join Group');
          if (this.model.owned) {
            this.deleteGroup();
          }
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

  deleteGroup: function () {
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("/#groups", {trigger: true})
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
          this.model.save({profile_id: model.get('id')}, {
            success: function () {
              this.render();
            }.bind(this)});
        }.bind(this)
      });
    }.bind(this));
    this.image = image;
    this.disabled = false;
  }
})
