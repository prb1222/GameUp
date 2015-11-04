GameUp.Views.GenreIndex = Backbone.CompositeView.extend({
  template: JST['main/genre_index'],

  className: "genre-index-view",

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addGenreSubview);
    this.collection.each(function(genre){
      this.addGenreSubview(genre);
    }.bind(this));
  },

  render: function () {
    var content = this.template({genres: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addGenreSubview: function (genre) {
    var genreItemView = new GameUp.Views.GenreItem({model: genre})
    this.addSubview('ul.genres-index', genreItemView);
    this.render();
  }
});
