GameUp.Views.GenreItem = Backbone.View.extend({
  template: JST['main/genre_item'],

  tagName: 'li',

  className: 'genre-item-view',

  events: {
    'click .genre-item':'toggleSelected'
  },

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.selectable = options.selectable;
    if (this.selectable) {
      this.selected = options.selected;
    }
  },

  render: function () {
    this.$el.html(this.template({genre: this.model}));
    this.$genreItem = this.$el.find('.genre-item');
    this.$genreItem.css('background-color', "rgb(" + this.model.get('color') + ")" );
    if (this.selectable) {
      this.$genreItem.addClass('selectable');
    }
    if (this.selected) {
      this.setSelected();
    }
    return this;
  },

  toggleSelected: function (event) {
    event.preventDefault();
    if (!this.selectable) {return;}
    this.$genreItem.toggleClass('selected');
    this.$el.toggleClass('no-border')
    this.selected = !this.selected;
  },

  setSelected: function () {
    if (!this.selectable) {return;}
    this.$genreItem.addClass('selected');
    this.$el.addClass('no-border');
  }
});
