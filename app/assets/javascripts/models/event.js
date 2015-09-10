GameUp.Models.Event = Backbone.Model.extend({
  urlRoot: 'api/events',

  parse: function (response) {
    if (response.date) {
      response.date = moment(response.date).format('MMMM DD YYYY HH:mm A');
    }

    if (response.attending_event) {
      this.attending_event = response.attending_event;
      delete response.attending_event;
    }

    this.attendance().set({id: undefined});

    if (response.attendee_id) {
      this.attendance().set({id: response.attendee_id});
      delete response.attendee_id;
    }

    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }

    if (response.attendees) {
      this.attendees().set(response.attendees, {parse: true});
      delete response.attendees;
    }

    if (response.groupmembername) {
      this.groupMemberName = response.groupmembername;
      delete response.groupmembername;
    }

    if (response.groupname) {
      this.groupName = response.groupname;
      delete response.groupname;
    }

    if (response.organizerpic) {
      this.organizerPic = response.organizerpic;
      delete response.organizerpic;

    }if (response.organizername) {
      this.organizername = response.organizername;
      delete response.organizername;
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
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new GameUp.Collections.Comments([], {event: this});
    }

    return this._comments;
  },

  attendees: function () {
    if (!this._attendees) {
      this._attendees = new GameUp.Collections.Users([], {});
    }

    return this._attendees;
  },

  formDate: function () {
    if (this.get('date')) {
      return moment(this.get('date'), 'MMMM DD YYYY HH:mm').format("YYYY[-]MM[-]DD");
    } else {
      return "";
    }
  },

  formTime: function() {
    if (this.get('date')) {
      return moment(this.get('date'), 'MMMM DD YYYY HH:mm A').format("hh[:]mm a");
    } else {
      return "";
    }
  },

  fullDate: function () {
    if (this.get('date')) {
      return moment(this.get('date'), 'MMMM DD YYYY HH:mm A').format("MMMM Do[,] YYYY [at] hh[:]mm a");
    } else {
      return "";
    }
  }

});
