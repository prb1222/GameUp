GameUp.Views.GenreItem = Backbone.View.extend({
  template: JST['main/genre_item'],

  tagName: 'li',

  className: 'genre-item',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({genre: this.model}));
    return this;
  }
});
