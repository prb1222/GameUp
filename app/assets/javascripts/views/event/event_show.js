GameUp.Views.EventShow = Backbone.CompositeView.extend({
  template: JST['event/event_show'],

  className: "event-show",

  events: {
    "click .toggle-attendance": "toggleAttendance",
    "click .delete-event": "deleteEvent",
    "click .edit-event": "editEvent",
    "click .event-attendees": "addAttendeesIndex",
    "click .event-comments": "addCommentsIndex"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.addCommentsIndex);
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.group().membership(), "change:id", this.render);
  },

  render: function () {
    var buttonText = !this.model.attendance().isNew() ? "Leave Event": "Join Event";
    this.$el.html(this.template({event: this.model, buttonText: buttonText}));
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
        success: function (attendance) {
          this.disabled = false;
          var userId = attendance.attributes.get('user_id');
          this.model.attendees().remove(userId);
          this.model.attendance().clear();
          if (this.model.organizer) {
            this.deleteEvent();
          }
        }.bind(this)
      })
      $('button.toggle-attendance').text('Join Event');
    } else {
      var attendance = new GameUp.Models.EventAttendee({event_id: this.model.id});
      attendance.save({},{
        success: function (attendance) {
          this.model.attendance().set(attendance);
          this.model.attendees().getOrFetch(attendance.get('user_id'));
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
  },

  addCommentsIndex: function () {
    this.removeSubviews('div.event-display-info');
    var subview = new GameUp.Views.CommentsIndex({collection: this.model.comments(),
                                                  event: this.model
                                                });
    this.addSubview('div.event-display-info', subview);
  },

  addAttendeesIndex: function () {
    this.removeSubviews('div.event-display-info');
    var subview = new GameUp.Views.UsersIndex({title: "Attendee List", collection: this.model.attendees()})
    this.addSubview('div.event-display-info', subview);
  }
})
