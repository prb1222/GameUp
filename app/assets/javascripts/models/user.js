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
  }
});
