GameUp.Models.Event = Backbone.Model.extend({
  urlRoot: 'api/events',

  parse: function (response) {
    if (response.group) {
      this.group().set(response.group);
      delete response.group;
    }

    return response;
  },

  group: function () {
    if (!this._group) {
      this._group = new GameUp.Models.Group();
    }

    return this._group;
  }
});
