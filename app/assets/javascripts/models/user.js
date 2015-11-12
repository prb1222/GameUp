GameUp.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  parse: function (response) {
    if (response.groups) {
      this.groups().set(response.groups, {parse: true});
      delete response.groups;
    }

    if (response.created_at) {
      this.created_at = response.created_at;
      delete response.created_at;
    }

    if (response.image) {
      this.image().set(response.image);
      delete response.image;
    }

    if (response.is_user !== undefined) {
      this.isUser = response.is_user;
      delete response.is_user;
    }

    if (response.next_event) {
      this.next_event = response.next_event;
      this.next_event.date = moment(this.next_event.date);
      delete response.next_event;
    }

    if (response.num_my_events) {
      this.num_my_events = response.num_my_events;
      delete response.num_my_events;
    }

    if (response.num_nearby_events) {
      this.num_nearby_events = response.num_nearby_events;
      delete response.num_nearby_events;
    }

    if (response.genres) {
      this.genres().set(response.genres, {parse: true});
      delete response.genres;
    }

    return response;
  },

  groups: function () {
    if (!this._groups) {
      this._groups = new GameUp.Collections.Groups([], {user: this});
    }

    return this._groups;
  },

  createdAt: function () {
    return moment(this.created_at).format("MMMM DD[,] YYYY");
  },

  image: function () {
    if (!this._image) {
      this._image = new GameUp.Models.Image();
    }

    return this._image;
  },

  genres: function () {
    if (!this._genres) {
      this._genres = new GameUp.Collections.Genres();
    }

    return this._genres;
  }
});
