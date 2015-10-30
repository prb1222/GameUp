GameUp.Views.RecommendedView = Backbone.View.extend({
  template: JST['main/recommended_explanation'],

  className: "recommended-modal",

  events: {
    "click .m-background":"remove",
    "click .close":"removeBtn"
  },

  initialize: function () {
    $(document).on('keydown', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      event.preventDefault();
      this.remove();
   }
 },

  render: function() {
    this.$el.html(this.template());
    return this
  },

  removeBtn: function(event) {
    event.preventDefault();
    this.remove();
  },
});
