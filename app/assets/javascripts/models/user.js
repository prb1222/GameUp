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
  }
});
