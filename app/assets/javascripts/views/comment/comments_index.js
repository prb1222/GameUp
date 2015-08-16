GameUp.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['comment/comments_index'],

  initialize: function (options) {
    this.attending = options.attending;
    this.event = options.event;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addCommentSubview)
    this.listenTo(this.event.attendance(), "change:id", this.render);
    this.collection.fetch();
  },

  events: {
    "click .new-comment":"addCommentForm"
  },

  render: function () {
    var content = this.template({attending: !this.event.attendance().isNew()});
    this.$el.html(content);
    this.removeSubviews('ul.comments-index');
    this.collection.each(function(comment){
      this.addCommentSubview(comment);
    }.bind(this))
    this.attachSubviews();
    return this;
  },

  addCommentSubview: function (comment) {
    var subview = new GameUp.Views.CommentItem({model: comment});
    this.addSubview('ul.comments-index', subview);
  },

  addCommentForm: function (event) {
    if (this.commentFormView) {
      this.removeSubview('div.comment-form', this.groupFormView)
    }
    var comment = new GameUp.Models.Comment({event_id: this.event.get('id')});
    this.formView = new GameUp.Views.CommentForm({model: comment, collection: this.collection, verb: "Create"});
    this.addSubview('div.comment-form', this.formView);
  }


});
