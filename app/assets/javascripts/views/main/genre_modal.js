GameUp.Views.GenreModal = Backbone.CompositeView.extend({
  template: JST['main/genre_modal'],

  events: {
    "click .cancel-button": "cancelCallback",
    "click .m-background": "cancelCallback",
    "click .delete-button": "successCallback"
  },

  initialize: function (options) {
    this.cancel = options.cancel;
    var allGenres = new GameUp.Collections.Genres();
    allGenres.fetch();
    var selectedGenres = this.collection.map( function (genre) {return genre.get('name')});
    var genresIndexView = new GameUp.Views.GenreIndex({selectable: true, selected: selectedGenres, collection: allGenres});
    this.addSubview('div.genres-index-container', genresIndexView);
    $(document).on('keydown', this.handleKey.bind(this));
  },

  handleKey: function (event) {
   if (event.keyCode === 27) {
     event.preventDefault();
     this.cancelCallback();
   } else if (event.keyCode === 13 ) {
     event.preventDefault();
     this.$el.find('.delete-button').trigger('click');
   }
 },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  cancelCallback: function () {
    this.cancel.call();
  }
});
