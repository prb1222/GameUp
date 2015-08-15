GameUp.Views.CommentItem = Backbone.View.extend({
  template: JST['comment/comment_item'],

  tagName: 'li',

  render: function () {
    var content = this.template({comment: this.model});
    this.$el.html(content);
    return this;
  }
});
