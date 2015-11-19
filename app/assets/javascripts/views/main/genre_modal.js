GameUp.Views.GenreModal = Backbone.View.extend({
  template: JST['main/genre_modal'],

  events: {
    "click .cancel-button": "cancelCallback",
    "click .m-background": "cancelCallback",
    "click .delete-button": "successCallback"
  },

  initialize: function (options) {
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
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  cancelCallback: function () {
    this.cancel.call();
  }
});
