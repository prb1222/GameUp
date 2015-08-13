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
    this.listenTo(this.model.membership(), "change", this.render)
  },

  render: function () {
    var buttonText = this.model.is_member() ? "Leave group" : "Join group";
    var content = this.template({group: this.model, buttonText: buttonText});
    this.$el.html(content);
    return this;
  },

  toggleMembership: function (event) {
    if (this.disabled) {return;}
    this.disabled = true;
    event.preventDefault();
    var membershipId = this.model.membership().id;
    if (membershipId) {
      this.model.membership().destroy({
        success: function () {
          this.disabled = false;
          this.model.membership().clear();
        }.bind(this)
      });
      $('button.toggle-membership').text('Join Group');
    } else {
      var membership = new GameUp.Models.GroupMembership({group_id: this.model.id});
      membership.save({},{
        success: function (membership) {
          this.model.membership().set(membership);
          $('button.toggle-membership').text('Leave Group');
          this.disabled = false;
        }.bind(this)
      });
    }
  }
})
