GameUp.Views.ConfirmationModal = Backbone.View.extend({

  template: JST['main/confirmation_modal'],

  initialize: function (noun, callback) {
    this.noun = noun;
    this.callback = callback;
  },

  render: function () {
    var content = this.template({noun: this.noun})
    this.$el.html(content);
    return this;
  },
});
