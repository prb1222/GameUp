GameUp.Views.GenreModal = Backbone.CompositeView.extend({
  template: JST['main/genre_modal'],

  events: {
    "click .cancel-button": "cancelCallback",
    "click .m-background": "cancelCallback",
    "click .submit-button": "submitCallback"
  },
  //LAST THINGS TO DO: ADD THIS TO USER SHOW
  //LAST THINGS TO DO: HANDLE SUBMIT BY PASSING SUCCESS CALLBACK AND HANDLING IN GROUP DETAIL
  initialize: function (options) {
    this.cancel = options.cancel;
    this.submit = options.submit;
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
  },

  submitCallback: function () {
    var genres = _.select(this.$el.find('.selected .genre-name').text().replace(/(\r\n|\n|\r)/gm,"").split(" "));
    this.submit.call(this, genres);
  }
});
