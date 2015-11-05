GameUp.Views.GenreItem = Backbone.View.extend({
  template: JST['main/genre_item'],

  tagName: 'li',

  className: 'genre-item',

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.selectable = options.selectable;
  },

  render: function () {
    this.$el.html(this.template({genre: this.model}));
    this.$el.css('background-color', "rgb(" + this.model.get('color') + ")" );
    if (this.selectable) {
      this.$el.addClass('selectable');
    }
    return this;
  }
});
