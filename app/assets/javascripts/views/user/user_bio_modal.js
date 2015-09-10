GameUp.Views.UserBioModal = Backbone.View.extend({
  template: JST['user/user_bio_modal'],

  events: {
    "click .m-background": "removeSelf",
    "click .close": "removeSelf",
    "submit form.user-bio-form":"submitForm",
  },

  initialize: function () {
    $(document).on('keydown', this.handleKey.bind(this));
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.removeSelf(event);
    } else if (event.keyCode === 13 ) {
      event.preventDefault();
      $('form.user-bio-form').trigger('submit');
    }
  },

  removeSelf: function (event) {
    event.preventDefault();
    this.remove();
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function (user) {
        this.remove();
      }.bind(this),

      error: function (error, errorText) {
      }.bind(this)
    })
  }
});
