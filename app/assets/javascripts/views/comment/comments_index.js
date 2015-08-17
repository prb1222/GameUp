GameUp.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['comment/comments_index'],

  className: "comments-index-view",

  initialize: function (options) {
    this.attending = options.attending;
    this.event = options.event;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addCommentSubview)
    this.listenTo(this.event.attendance(), "change:id", this.render);
    this.collection.fetch({data: {flag: "event", eventId: this.event.get('id')}});
  },

  events: {
    "click .new-comment":"addCommentForm",
    "click :not(.new-comment)":"handleClick"
  },

  render: function () {
    var attending = !this.event.attendance().isNew();
    var content = this.template({attending: attending});
    if (!attending) {
      this.removeCommentForm();
    }
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
    this.removeCommentForm();
    var comment = new GameUp.Models.Comment({event_id: this.event.get('id')});
    this.formView = new GameUp.Views.CommentForm({model: comment, collection: this.collection, verb: "Create"});
    this.addSubview('div.comment-form', this.formView);
    this.$el.find('.comment-textarea').focus();
    this.$el.find('.new-comment').css("display","none");
  },

  removeCommentForm: function () {
    this.formView && this.removeSubview('div.comment-form', this.formView);
    this.$el.find('.new-comment').css("display","block");
  },

  handleClick: function (event) {
    var $form = $('div.comment-form');
    var $target = $(event.currentTarget);
    if ($form.find($target).length || $form.is($target)) {
      return; // ASK HOW TO BIND OUTSIDE EL
    }
    this.removeCommentForm();
  }


});
