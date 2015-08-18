GameUp.Views.ImageItem = Backbone.View.extend({
  template: JST['image/image_item'],

  tagName: "li",

  className: "image-item",

  events: {
    "click":"handleClick",
    "click .m-background":"closeModal",
    "click .m-content":"handleSubmit"
  },

  initialize: function (options) {
    this.ownerModel = options.ownerModel;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({image: this.model});
    this.$el.html(content);
    return this;
  },

  handleClick: function (event) {
    event.preventDefault();
    var $target = $(eventCurrentTarget)
    if (GameUp.currentUser.userId !== this.ownerModel.get('owner_id')) {
      return;
    }
    debugger;
    if (this.modal && $target === "images") {
      this.modal.remove();
      this.modal = undefined;
    }

  },

  closeModal: function (event) {
    event.preventDefault();
    this.modal.remove();
  }
})
