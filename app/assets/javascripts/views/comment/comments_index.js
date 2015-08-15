GameUp.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['comment/comments_index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addCommentSubview);
    this.collection.fetch();
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addCommentSubview: function (comment) {
    var subview = new GameUp.Views.CommentItem({model: comment});
    this.addSubview('ul.comments-index', subview);
  }


});
