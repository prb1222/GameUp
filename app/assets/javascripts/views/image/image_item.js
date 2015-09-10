GameUp.Views.ImageItem = Backbone.View.extend({
  template: JST['image/image_item'],

  tagName: "li",

  className: "image-item container col-md-4 col-xs-4",

  events: {
    "click":"handleClick",
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
    this.modal = new GameUp.Views.ImageModal({model: this.model, groupModel: this.ownerModel});
    $('body').append(this.modal.render().$el);
  },

  closeModal: function (event) {
    event.preventDefault();
    this.modal.remove();
    this.modal = null;
  }
})
