GameUp.Views.GroupDetail = Backbone.View.extend({
  template: JST['group/group_detail'],

  className: "group-detail-view",

  events: {
    "click button": "toggleMembership",
    "click .delete-group": "deleteGroup"
  },

  attributes: function () {
    return {
      "data-id": this.model.id
    }
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.membership(), "change:id", this.render)
  },

  render: function () {
    var buttonText = this.model.is_member() ? "Leave group" : "Join group";
    var content = this.template({group: this.model, buttonText: buttonText});
    this.$el.html(content);
    if (this.model.owned) {
      var $button = $('<button>').addClass('delete-group').text("Delete Group");
      this.$el.append($button);
    }
    return this;
  },

  toggleMembership: function (event) {
    if (this.disabled) {return;}
    this.disabled = true;
    event.preventDefault();
    // var membershipId = this.model.membership().id;
    if (this.model.membership().has("id")) {
      this.model.membership().destroy({
        success: function () {
          this.disabled = false;
          this.model.membership().clear();
          this.$('button.toggle-membership').text('Join Group');
          // this.model.fetch();
          // this.model.meets().each(function(meet){
          //   meet.fetch();
          // })
        }.bind(this)
      });
    } else {
      this.model.membership().set({group_id: this.model.id});
      this.model.membership().save({},{
        success: function (membership) {
          // this.model.membership().set(membership);
          this.$('button.toggle-membership').text('Leave Group');
          this.disabled = false;
        }.bind(this)
      });
    }
  },

  deleteGroup: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("/#groups", {trigger: true})
      }.bind(this)
    })
  }
})
