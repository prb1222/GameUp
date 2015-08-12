GameUp.Views.GroupDetail = Backbone.View.extend({
  template: JST['group/group_detail'],

  className: "group-detail-view",

  events: {
    "click button": "toggleMembership"
  },

  attributes: function () {
    return {
      "data-id": this.model.id
    }
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({group: this.model});
    this.$el.html(content);
    if (this.model.member) {
      var $button = $('<button>').addClass("leave-group").text("Leave Group");
      this.$el.append($button);
    } else {
      var $button = $('<button>').addClass("join-group").text("Join Group");
      this.$el.append($button);
    }
    return this;
  },

  toggleMembership: function (event) {
    event.preventDefault();

  }
})
