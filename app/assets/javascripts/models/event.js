GameUp.Models.Event = Backbone.Model.extend({
  urlRoot: 'api/events',

  parse: function (response) {
    if (response.group) {
      this.group().set(this.group().parse(response.group));
      delete response.group;
    }

    if (response.date) {
      response.date = new Date(response.date).toString();
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
