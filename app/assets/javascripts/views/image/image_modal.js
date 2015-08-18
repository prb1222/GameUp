GameUp.Views.ImageModal = Backbone.View.extend({
  template: JST['image/image_modal'],

  initialize: function (options) {
    this.groupModel = options.groupModel;
  },

  events: {
    "click .m-background": "remove",
    "click button.profile-pic":"changeProfilePic",
    "click button.jumbo-pic":"changeJumboPic",
  },

  render: function () {
    var content = this.template({image: this.model, group: this.groupModel});
    this.$el.html(content);
    return this;
  },

  changeProfilePic: function () {
    this.groupModel.profilePic().set({image_url: this.model.get('image_url')});
    this.groupModel.save({group: {profile_id: this.model.get('id')}}, {
      success: function () {
        this.remove();
      }.bind(this)
    })
  },

  changeJumboPic: function () {
    this.groupModel.jumboPic().set({image_url: this.model.get('image_url')});
    this.groupModel.save({group: {profile_id: this.model.get('id')}}, {
      success: function () {
        this.remove();
      }.bind(this)
    })
  },
});
