GameUp.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  parse: function (response) {
    if (response.groups) {
      this.groups().set(response.groups, {parse: true});
      delete response.groups;
    }

    return response;
  },

  groups: function () {
    if (!this._groups) {
      this._groups = new GameUp.Collections.Groups([], {user: this});
    }

    return this._groups;
  }
});
