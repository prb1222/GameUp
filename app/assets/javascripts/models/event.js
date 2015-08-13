GameUp.Models.Event = Backbone.Model.extend({
  urlRoot: 'api/events',

  parse: function (response) {
    if (response.date) {
      response.date = moment(response.date).format('MMMM Do YY h:mm a');
    }

    if (response.attending_event) {
      this.attending_event = response.attending_event;
      delete response.attending_event;
    }

    if (response.attendee_id) {
      this.attendance().set({id: response.attendee_id});
      delete response.attendee_id;
    }

    this.organizer = response.organizer;
    delete response.organizer;

    return response;
  },

  group: function () {
    return GameUp.groups.getOrFetch(this.get('group_id'));
  },

  is_attending: function () {
    return !this.attendance().isNew();
  },

  attendance: function () {
    if (!this._attendance) {
      this._attendance = new GameUp.Models.EventAttendee();
    }

    return this._attendance;
  }

});
