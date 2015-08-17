GameUp.Views.CommentForm = Backbone.View.extend({
  template: JST['comment/comment_form'],

  events: {
      "submit .comment-form": "submitComment"
  },

  initialize: function (options) {
    this.verb = options.verb;
  },

  render: function () {
    var content = this.template({comment: this.model, verb: this.verb});
    this.$el.html(content);
    return this;
  },

  submitComment: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData.comment, {
        success: function (model) {
          debugger;
          this.collection.add(model);
          this.$el.empty();
          this.remove();
        }.bind(this),

        error: function (error, errorText) {
          this.$el.find('.errors').empty();
          errorText.responseJSON.forEach(function(error) {
            var $li = $('<li>'+ error +'</li>')
            this.$el.find('.errors').append($li);
          }.bind(this));
        }.bind(this)
    })
  }
});
