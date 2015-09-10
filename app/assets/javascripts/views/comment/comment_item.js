GameUp.Views.CommentItem = Backbone.View.extend({
  template: JST['comment/comment_item'],

  tagName: 'li',

  events: {
    "click div.comment-body": "editComment",
    "click div.c-background": "submitComment",
    "click .delete-comment": "deleteComment"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({comment: this.model});
    this.$el.html(content);
    if (this.model.get('user_id') === parseInt(GameUp.currentUser.userId)) {
      this.$el.find('.comment-body').addClass('hover-fix');
    }
    return this;
  },

  editComment: function (event) {
    event.preventDefault();
    var $div = $(event.currentTarget);
    if (this.model.get('user_id') !== parseInt(GameUp.currentUser.userId)) {
      return;
    } else if (this.editing) {
      return;
    }
    this.editing = true;
    $div.empty();
    $form = $('<form>').addClass('comment-form').append($('<textarea>'));
    $form.find('textarea').val(this.model.get('body'));
    $background = $('<div>').addClass('c-background');
    $div.append($form).append($background);
    var $textarea = $form.find('textarea');
    var text = $textarea.val();
    $textarea.val("");
    $textarea.focus();
    $textarea.val(text);
  },

  submitComment: function (event) {
    event.preventDefault();
    var form = this.$el.find('.comment-form textarea').val();
    var $div = this.$el.find('div.comment-body');
    this.model.save({comment: {body: form}}, {
      success: function (model) {
        $div.empty();
        $div.text(model.escape('body'));
        this.editing = false;
      }.bind(this),

      error: function () {
        $div.text(this.model.escape('body'));
        this.editing = false;
      }.bind(this)
    })
  },

  deleteComment: function (event) {
    if (this.deleting) {return;}
    this.deleting = true;
    event.preventDefault();
    this.model.destroy({
      success: function () {
        this.remove();
        this.deleting = false;
      }.bind(this)
    })
  }
});
