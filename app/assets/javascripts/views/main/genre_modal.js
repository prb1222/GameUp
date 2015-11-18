GameUp.Views.GenreModal = Backbone.View.extend({
  template: JST['main/genre_modal'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
