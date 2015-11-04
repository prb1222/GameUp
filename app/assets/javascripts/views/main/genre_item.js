GameUp.Views.GenreItem = Backbone.View.extend({
  template: JST['main/genre_item'],

  className: 'genre-item',

  render: function () {
    this.$el.html(this.template({genre: this.model}));
    return this;
  }
});
