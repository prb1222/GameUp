GameUp.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['event/event_show'],

  events: {
    "click .toggle-attendance": "toggleAttendance",
    "click .delete-event": "deleteEvent",
    "click .edit-event": "editEvent"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.group().membership(), "change:id", this.render);
  },

  render: function () {
    var buttonText = !this.model.attendance().isNew() ? "Leave Event": "Join Event";
    this.$el.html(this.template({event: this.model, buttonText: buttonText}));

    if (this.model.organizer) {
      var $buttonD = $('<button>').addClass('delete-event').text("Delete Event");
      var $buttonE = $('<button>').addClass('edit-event').text("Edit Event");
      this.$el.append($buttonD);
      this.$el.append($buttonE);
    }
    this.attachSubviews();
    return this;
  },

  toggleAttendance: function () {
    if (this.disabled) {return;}
    this.disabled = true;
    event.preventDefault();
    var attendanceId = this.model.attendance().id;
    if (attendanceId) {
      this.model.attendance().destroy({
        success: function () {
          this.disabled = false;
          this.model.attendance().clear();
        }.bind(this)
      })
      $('button.toggle-attendance').text('Join Event');
    } else {
      var attendance = new GameUp.Models.EventAttendee({event_id: this.model.id});
      attendance.save({},{
        success: function (attendance) {
          this.model.attendance().set(attendance);
          $('button.toggle-attendance').text('Leave Event');
          this.disabled = false;
        }.bind(this)
      });
    }
  },

  deleteEvent: function () {
    this.model.destroy({
      wait: true,
      success: function () {
        this.remove();
        Backbone.history.navigate("#groups/" + this.model.group().id, {trigger: true})
      }.bind(this)
    })
  },

  editEvent: function () {
    var formView = new GameUp.Views.EventForm({model: this.model, collection: this.model.group().meets(), verb: "Edit" })
    $('body').append(formView.render().$el);
  }
})
