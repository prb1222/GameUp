GameUp.Views.GenreIndex = Backbone.CompositeView.extend({
  template: JST['main/genre_index'],

  className: "genre-index-view",

  initialize: function (options) {
    this.listenTo(this.collection, "sync add", this.render);
    this.listenTo(this.collection, "reset", this.render);
    this.selectedGenres = options.selected || [];
    this.selectable = options.selectable;
    this.clickable = options.clickable;
    this.singleColumn = options.singleColumn;
  },

  render: function () {
    var content = this.template({genres: this.collection});
    this.$el.html(content);
    if (this.clickable) {
      this.$el.addClass('clickable');
    }

    this.removeSubviews('ul.genres-index');
    this.collection.each(function(genre){
      this.addGenreSubview(genre);
    }.bind(this));

    this.attachSubviews();
    if (this.singleColumn) {
      var xW = $('ul.genres-index').width();
      $('div.genre-item').css('transform', 'translateX(calc((' +  xW + 'px - 280px) / 2 - 6px))');
    }
    return this;
  },

  addGenreSubview: function (genre) {
    var selected = _.contains(this.selectedGenres, genre.get('name'));
    var genreItemView = new GameUp.Views.GenreItem({model: genre, selectable: this.selectable, selected: selected});
    this.addSubview('ul.genres-index', genreItemView);
  }
});
