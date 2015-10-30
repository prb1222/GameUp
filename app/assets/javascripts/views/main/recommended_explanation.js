GameUp.Views.RecommendedView = Backbone.View.extend({
  template: JST['main/recommended_explanation'],

  className: "recommended-modal",

  events: {
    "click .m-background":"remove",
    "click .close":"removeBtn"
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
