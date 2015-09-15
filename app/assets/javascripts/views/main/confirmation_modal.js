GameUp.Views.ConfirmationModal = Backbone.View.extend({

  template: JST['main/confirmation_modal'],

  events: {
    "click .cancel-button": "cancelCallback",
    "click .m-background": "cancelCallback",
    "click .delete-button": "successCallback"
  },

  initialize: function (options) {
    this.noun = options.noun;
    this.success = options.success;
    this.cancel = options.cancel;
    $(document).on('keydown', this.handleKey.bind(this));
  },

  handleKey: function (event) {
   if (event.keyCode === 27) {
     event.preventDefault();
     this.remove();
   } else if (event.keyCode === 13 ) {
     event.preventDefault();
     this.$el.find('.delete-button').trigger('click');
   }
 },

  render: function () {
    var content = this.template({noun: this.noun})
    this.$el.html(content);
    return this;
  },

  successCallback: function () {
    this.success.call();
  },

  cancelCallback: function () {
    this.cancel.call();
  }
});
