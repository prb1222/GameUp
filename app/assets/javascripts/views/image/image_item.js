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
    var $target = $(event.CurrentTarget)
    if (this.modal) {
      return;
    }
    this.modal = new GameUp.Views.ImageModal({model: this.model, groupModel: this.ownerModel});
    $('body').append(this.modal.render().$el);
  },

  closeModal: function (event) {
    event.preventDefault();
    this.modal.remove();
  }
})
